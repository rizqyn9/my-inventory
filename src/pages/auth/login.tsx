import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TextField } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginDto, loginDto } from "@common/auth/dto"
import { Button } from "@/components/ui/button"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

export function LoginPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState, reset } = useForm<LoginDto>({
    resolver: zodResolver(loginDto),
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: window.api.auth.login,
  })

  const handleOnSubmit = handleSubmit((data) => {
    mutateAsync(data).then((res) => {
      if (res.success) return navigate("/product")
      reset()
    })
  })

  const { errors } = formState

  return (
    <div className="grid place-content-center w-screen h-screen">
      <Card className="min-w-[30rem] max-w-[100vw]">
        <CardHeader>
          <CardTitle className="flex flex-col gap-1">
            <span>Hi wellcome</span>
            <span>to inventories 👋🏼</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isLoading}>
            <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
              <TextField
                label="Username"
                {...register("username")}
                error={errors.username?.message}
              />
              <TextField
                label="Password"
                type="password"
                error={errors.password?.message}
                {...register("password", {
                  required: true,
                })}
              />

              <Button disabled={isLoading}>Signin</Button>
            </form>
          </fieldset>
        </CardContent>
      </Card>
    </div>
  )
}
