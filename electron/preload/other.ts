import { TOAST_CHANNEL, ToastData } from "@common/other"
import { ipcRenderer, type IpcRendererEvent } from "electron"

export function onReceiveToast(
  handle: (e: IpcRendererEvent, data: ToastData) => unknown
) {
  ipcRenderer.on(TOAST_CHANNEL, handle)

  return () => {
    ipcRenderer.removeAllListeners(TOAST_CHANNEL)
  }
}
