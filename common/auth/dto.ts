import { z } from "zod"

export const loginDto = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
})

export type LoginDto = z.infer<typeof loginDto>

export type LoginResult =
  | {
      success: true
      username: string
    }
  | {
      success: false
      message: string
    }
