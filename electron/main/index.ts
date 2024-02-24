import { app, BrowserWindow } from "electron"
import path from "node:path"
import { initRealm } from "./realm"

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

let win: BrowserWindow | null

const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"]

function createWindow() {
  win = new BrowserWindow({
    // icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: 1000,
    height: 740,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      webSecurity: false,
    },
    titleBarStyle: "hiddenInset",
  })

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile("dist/index.html")
    // win.loadFile(path.join(process.env.DIST, "index.html"))
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

  const realm = await initRealm()

  console.log({
    a: realm.objects("product"),
  })
})
