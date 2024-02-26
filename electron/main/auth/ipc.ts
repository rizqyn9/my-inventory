import { AUTH_CHANNEL } from "@common/auth"
import { ipcMain } from "electron"
import { LoginDto, LoginResult } from "@common/auth/dto"
import { login } from "./api"
import { sendNotification } from "../other/toast"

ipcMain.handle(
  AUTH_CHANNEL.LOGIN,
  async (_, data: LoginDto): Promise<LoginResult> => {
    const res = await login(data)

    if (res.status == 200) {
      const { username } = res.data
      sendNotification({ msg: `Hi ${username}` })
      return {
        success: true,
        username,
      }
    } else {
      const message = res.data?.message || "Something error"
      sendNotification({ msg: message })
      return {
        success: false,
        message,
      }
    }
  }
)
