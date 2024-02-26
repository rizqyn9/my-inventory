import { TOAST_CHANNEL, ToastData } from "@common/other"
import { win } from "../index"

export function sendNotification(data: ToastData, _win = win): void {
  if (!_win) return
  return _win?.webContents.send(TOAST_CHANNEL, data)
}
