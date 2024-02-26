import { ProductDto } from "@common/product"
import { toIdr } from "@common/utils"
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

type CardProductPreviewProps = ProductDto & { onClick?: () => void }

export function CardProductPreview(props: CardProductPreviewProps) {
  const { title, image, price, stock, onClick } = props

  return (
    <Card onClick={onClick} className="group cursor-pointer">
      <AspectRatio
        ratio={1 / 1}
        className="rounded-t-lg relative overflow-hidden bg-slate-700"
      >
        <img
          src={image || ""}
          alt={title}
          title={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </AspectRatio>
      <CardHeader>
        <CardTitle className="font-lora capitalize group-hover:underline underline-offset-2">
          {title}
        </CardTitle>
        <CardDescription className="mt-2">
          <p className="text-sm">{toIdr(price)}</p>
          <p className="text-sm">Stock: {stock}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
