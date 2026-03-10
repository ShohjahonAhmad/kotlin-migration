# CSS Investigation Report

## Selected Element

A clickable card in the hero section of the Kotlin homepage. The card is rendered as an `<a>` element with multiple classes applied programmatically via `cardCn()` from `@rescui/card`:

```
a.kto-col-3
 .kto-col-md-6
 ._card_1t123uy_5
 ._modeClassic_1t123uy_36
 ._themeDark_1t123uy_31
 ._bordersRadius8_1t123uy_166
 ._paddings24_1t123uy_154
```

This element has non-trivial styling because its final computed styles result from:

- CSS Modules from `@rescui/card` with mangled class names
- CSS custom properties (variables) used as design tokens
- CSS grid utility classes
- Dark theme applied via a conditional class

---

## Five CSS Properties

### 1. `background-color: rgb(48, 48, 51)`

**Computed value:** `rgb(48, 48, 51)`

**Styles panel rule:**

```css
._themeDark_1t123uy_31 {
  background-color: #303033;
  background-color: var(--card-background-color, #303033);
}
```

**Generated CSS location:** `@rescui/card/lib/index.css:26`

**Source map trace:** DevTools resolves the link to `node_modules/@rescui/card/lib/index.css:26`. This is already a compiled file — source maps trace to the package's compiled output, not the original component source. The `var(--card-background-color, #303033)` fallback value `#303033` is what the browser uses since no override is provided, which resolves to `rgb(48, 48, 51)`.

---

### 2. `border-color: rgba(255, 255, 255, 0.2)`

**Computed value:** `rgba(255, 255, 255, 0.2)`

**Styles panel rule:**

```css
._themeDark_1t123uy_31 {
  border-color: #fff3;
  border-color: var(--card-border-color, rgba(255, 255, 255, 0.2));
}
```

**Generated CSS location:** `@rescui/card/lib/index.css:26`

**Source map trace:** Same rule block as `background-color`, same file and line. The value `rgba(255,255,255,.2)` is the CSS variable fallback. No `--card-border-color` override is defined anywhere in the project so the fallback is always used. The duplicate property (`#fff3` followed by `var(...)`) is a progressive enhancement pattern for browsers that don't support CSS variables.

---

### 3. `border-radius: 8px`

**Computed value:** `8px`

**Styles panel rules (two rules interact):**

```css
._bordersRadius8_1t123uy_166 {
  --rs-card-border-radius: 8px;
}

._card_1t123uy_5 {
  border-radius: 0;
  border-radius: var(--rs-card-border-radius, 0);
}
```

**Generated CSS locations:**

- `._bordersRadius8_` → `@rescui/card/lib/index.css:193`
- `._card_` → `@rescui/card/lib/index.css:1`

**Source map trace:** The final value requires tracing two separate rules. `._bordersRadius8_` sets the CSS variable `--rs-card-border-radius: 8px`. `._card_` consumes it via `var()`. DevTools Computed panel shows `8px` but clicking the arrow only leads to the `var()` declaration in `._card_`, not to where the variable is defined. You have to manually find `._bordersRadius8_` in the Styles panel to complete the trace.

---

### 4. `padding: 24px`

**Computed value:** `24px` (all sides)

**Styles panel rule:**

```css
._paddings24_1t123uy_154 {
  padding: 24px;
}
```

**Generated CSS location:** `@rescui/card/lib/index.css:184`

**Source map trace:** This is the most straightforward trace. The rule is simple, no variables involved, and source maps point directly to `@rescui/card/lib/index.css:184`. The only limitation is that this is still the compiled package file, not the original authored source.

---

### 5. `grid-column-start: span 3`

**Computed value:** `span 3`

**Styles panel rule:**

```css
.kto-col-3 {
  grid-column: span 3;
}
```

**Generated CSS location:** `static/grid.css:17`

**Source map trace:** This is the cleanest trace in the entire element. `.kto-col-3` is a plain CSS class from the project's own `static/grid.css`. DevTools source map resolves directly to `static/grid.css:17` — the exact line in the original authored file. No variable indirection, no mangled class names, no package boundaries.

---

## Three Cases Where Mapping Breaks Down

### Case 1: CSS Variable Indirection

The `border-radius: 8px` value requires tracing through two separate rules. One class sets `--rs-card-border-radius: 8px` and another consumes it via `var(--rs-card-border-radius, 0)`. In the DevTools Computed panel, clicking the arrow on `border-radius` leads only to the `var()` declaration — it does not automatically navigate to where the variable is defined. To complete the trace you must manually search the Styles panel for the variable definition. This two-step indirection breaks the direct computed → source mapping and becomes more complex when variables are defined in a separate theme file or inherited from a parent element.

### Case 2: CSS Modules Class Name Mangling

All `@rescui/card` classes have their names mangled with a hash suffix — `.themeDark` becomes `._themeDark_1t123uy_31`, `.card` becomes `._card_1t123uy_5`. These mangled names exist only in the generated CSS. Searching the original source code for `_themeDark_1t123uy_31` returns no results. You cannot navigate from the generated class name back to the authored class name without knowing the CSS Modules naming convention (`_originalName_hash_lineNumber`). Source maps provide the file and line but the class name itself is unrecognizable in the original source.

### Case 3: Third Party Package Boundary

For all five properties except `grid-column-start`, source maps trace back to `node_modules/@rescui/card/lib/index.css` — the package's compiled output, not the original authored source. The `lib/index.css` file is itself already a processed and compiled file. There are no source maps that go further back to the original component source files inside the `@rescui/card` package. The trace stops at the package boundary, making it impossible to understand why a specific value was chosen or to find the original design decision in the component's source.
