import { Container } from "@/components/layout/container"
import { Heading } from "@/components/ui/typography"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductDto, productDto } from "@common/product"
import { TextField } from "@/components/ui/input"
import { BackButton } from "@/components/ui/back-button"
import { useNavigate } from "react-router-dom"
import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button"
import { useMutation } from "react-query"

export function ProductCreatePage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm<ProductDto>({
    resolver: zodResolver(productDto),
    mode: "onChange",
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: window.api.product.create,
  })

  const handleOnSubmit = handleSubmit(async (data) => {
    mutateAsync(data).then(() => navigate("/product"))
  })

  const { errors } = formState

  return (
    <Container>
      <BackButton to="/product" className={cn("")} />
      <Heading className="my-8 font-lora">Create Product</Heading>
      <fieldset disabled={isLoading}>
        <form className="flex flex-col gap-3" onSubmit={handleOnSubmit}>
          <TextField
            label="Name"
            {...register("title")}
            error={errors.title?.message}
          />
          <TextField
            label="Description"
            {...register("desc")}
            error={errors.desc?.message}
          />
          <TextField
            label="Image URL"
            {...register("image")}
            error={errors.image?.message}
          />
          <TextField
            label="Price"
            {...register("price", {
              valueAsNumber: true,
              min: 0,
              max: 5,
            })}
            error={errors.price?.message}
          />
          <TextField
            label="Stock"
            {...register("stock", {
              valueAsNumber: true,
              min: 0,
              max: 5,
            })}
            error={errors.stock?.message}
          />
          <TextField
            label="Rating"
            {...register("rating", {
              valueAsNumber: true,
              min: 0,
              max: 5,
            })}
            error={errors.rating?.message}
          />

          <Button disabled={isLoading}>Create</Button>
        </form>
      </fieldset>
    </Container>
  )
}
