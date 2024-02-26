import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ProductDto } from "@common/product"
import { CardProductPreview } from "@/components/features/product/card-product"
import { Heading } from "@/components/ui/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PlusIcon } from "@/components/icons/plus"
import { Button } from "@/components/ui/button"

export function ProductMainPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<WithId<ProductDto>[]>([])

  function getProducts() {
    window.api.product.list().then(setProducts)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Container>
      <Heading className="my-8">Products</Heading>

      <Section className="grid lg:grid-cols-4 md:grid-flow-col-3 grid-cols-2 gap-4">
        {products?.map(({ id, ...product }) => {
          return (
            <CardProductPreview
              key={id}
              {...product}
              onClick={() => navigate(`/product/${id}`)}
            />
          )
        })}
      </Section>

      <Link to="/product/create">
        <Button className="fixed bottom-4 right-4 flex items-center gap-3">
          <PlusIcon />
          <span>Create Product</span>
        </Button>
      </Link>
    </Container>
  )
}
