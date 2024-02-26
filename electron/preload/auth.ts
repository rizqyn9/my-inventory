import { ipcRenderer } from "electron"
import { AUTH_CHANNEL, LoginDto, LoginResult } from "@common/auth"

export const authApi = {
  login: (data: LoginDto): Promise<LoginResult> =>
    ipcRenderer.invoke(AUTH_CHANNEL.LOGIN, data),
}
