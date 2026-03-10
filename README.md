# Kotlin Web Site — React Router 7 Migration

Migration of the Kotlin homepage to React Router 7 with Server-Side Rendering.

**Live Demo:** https://kotlin-migration.vercel.app/

## Getting Started

### Installation

```bash
npm install
```

### Build and Run

```bash
npm run build
npm start
```

Available at `http://localhost:3000`

### Docker

```bash
docker build -t kotlin-migration .
docker run -p 3000:3000 kotlin-migration
```

## Tech Stack

- React Router 7 (Framework Mode, SSR)
- React 19
- TypeScript
- Vite

## CSS Transformation

This project uses Vite as the bundler. Authored CSS goes through the following transformations during build:

- **SCSS** files are compiled to plain CSS
- **CSS Modules** from `@rescui` components have their class names mangled into unique scoped identifiers (e.g. `.main` becomes `._main_1voh2i7_17`) to prevent naming collisions
- **PostCSS** processes the CSS for compatibility
- Vite then bundles and minifies all CSS into a single file per route

As a result the generated CSS does not correspond 1-to-1 to the original source — class names are transformed, files are merged, and rules may be reordered.

## Generated CSS and Source Maps

After running `npm run build`, the generated files are located in:

```
build/
└── client/
    └── assets/
        ├── home-[hash].css        # all page styles bundled and minified
        ├── home-[hash].css.map    # source map linking generated CSS back to original files
        ├── root-[hash].css        # root/global styles
        └── root-[hash].css.map    # source map for root styles
```

Source maps are generated automatically by Vite and link each rule in the generated CSS back to its original authored source file.
