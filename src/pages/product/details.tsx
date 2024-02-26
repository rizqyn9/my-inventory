import { ProductDetails } from "@/components/features/product/product"
import { Container } from "@/components/layout/container"
import { BackButton } from "@/components/ui/back-button"
import { ProductDto } from "@common/product"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export function ProductDetailsPage() {
  const { id: productId } = useParams()
  const [product, setProduct] = useState<
    "not-found" | "loading" | WithId<ProductDto>
  >("loading")
  const navigate = useNavigate()

  useEffect(() => {
    if (!productId) setProduct("not-found")
    else {
      window.api.product.details(productId).then(setProduct)
    }
  }, [productId])

  if (product === "not-found") return <p>Not Found</p>
  if (product === "loading") return <p className="animate-pulse">Loading...</p>

  return (
    <Container>
      <BackButton onClick={() => navigate("/product")} />
      <ProductDetails {...product} />
    </Container>
  )
}
