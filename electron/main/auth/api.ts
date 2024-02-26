import { LoginDto } from "@common/auth/dto"
import axios from "axios"

const AUTH_URI = "https://dummyjson.com"

const authApi = axios.create({
  baseURL: AUTH_URI,
  headers: { "Content-Type": "application/json" },
  validateStatus: () => true,
})

export async function login(data: LoginDto) {
  return authApi.post("/auth/login", data)
}
