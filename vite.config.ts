import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
  ],
  
  resolve: {
    alias: {
      "@rescui/card": "/node_modules/@rescui/card/lib/index.js",
    },
  },
  ssr: {
    noExternal: [
      "@jetbrains/kotlin-web-site-ui",
      "@rescui/ui-contexts",
      "@rescui/typography",
      "@rescui/button",
      "@rescui/icons",
      "@rescui/colors",
      "@rescui/card",
      "@rescui/tab-list",
    ],
  },
  optimizeDeps: {
    include: [
      "@rescui/ui-contexts", 
      "@rescui/typography",
    ],
  },
});