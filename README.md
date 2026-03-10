# Kotlin Web Site — React Router 7 Migration

Migration of the Kotlin homepage to React Router 7 with Server-Side Rendering.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Available at `http://localhost:5173`

### Production

```bash
npm run build
npm start
```

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
