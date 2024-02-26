import { contextBridge } from "electron"
import { productApi } from "./product"
import { onReceiveToast } from "./other"
import { authApi } from "./auth"

const api = {
  auth: authApi,
  product: productApi,
}

const commonApi = {
  onReceiveToast,
}

// https://www.electronjs.org/docs/latest/tutorial/context-isolation

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("api", api)
contextBridge.exposeInMainWorld("common", commonApi)

declare global {
  interface Window {
    api: typeof api
    common: typeof commonApi
  }
}
