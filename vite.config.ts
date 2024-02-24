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
          entry: "electron/main.ts",
          vite: {
            build: {
              minify: false,
              outDir: "dist-electron",
              rollupOptions: {
                external: Object.keys(pkg.dependencies),
              },
            },
          },
        },
        {
          entry: "electron/preload.ts",
          vite: {
            build: {
              minify: false,
              outDir: "dist-electron",
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
      // electron({
      //   main: {
      //     // Shortcut of `build.lib.entry`.
      //     entry: 'electron/main.ts',
      //   },
      //   preload: {
      //     // Shortcut of `build.rollupOptions.input`.
      //     // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
      //     input: path.join(__dirname, 'electron/preload.ts'),
      //   },
      //   // Ployfill the Electron and Node.js built-in modules for Renderer process.
      //   // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      //   renderer: {},
      // }),
      renderer(),
    ],
  }
})
