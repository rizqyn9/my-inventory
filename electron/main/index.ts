import { app, BrowserWindow } from "electron"
import path from "node:path"
import { initRealm } from "./realm"
import { productSchema } from "./product/schema"

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//

process.env.DIST_ELECTRON = path.join(__dirname, "..")
process.env.DIST = path.join(process.env.DIST_ELECTRON, "../dist")
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST_ELECTRON, "../public")

export let win: BrowserWindow | null

const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"]

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      webSecurity: false,
    },
    titleBarStyle: "default",
  })

  // sendNotification({ msg: "Hi from main" })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile("dist/index.html")
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
    win = null
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(async () => {
  createWindow()

  await initRealm({
    schema: [productSchema],
  })
})

//
import "./ipc-handler"
