import { rmSync } from "fs"
import path from "path"
import { defineConfig } from "vite"
import electron from "vite-plugin-electron"
import react from "@vitejs/plugin-react"
import renderer from "vite-plugin-electron-renderer"
import pkg from "./package.json"

// https://vitejs.dev/config/
export default defineConfig(() => {
  rmSync(path.join(__dirname, "dist-electron"), {
    recursive: true,
    force: true,
  })

  return {
    build: { minify: false },
    plugins: [
      react(),
      electron([
        {
          // main
          entry: "electron/main/index.ts",
          vite: {
            build: {
              minify: false,
              outDir: "dist-electron/main",
              rollupOptions: {
                external: Object.keys(pkg.dependencies),
              },
            },
          },
        },
        {
          entry: "electron/preload/index.ts",
          vite: {
            build: {
              minify: false,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys(pkg.dependencies),
              },
            },
          },
          onstart(args) {
            args.reload()
          },
        },
      ]),
      renderer(),
    ],
  }
})
