import { ProductDto } from "@common/product"
import { toIdr } from "@common/utils"
import { Star } from "../../icons/star"
import { Heading } from "../../ui/typography"
import { DialogConfirmDelete } from "./confirm-delete"

type ProductProps = WithId<ProductDto>

export function ProductDetails(props: ProductProps) {
  const { title, image, desc, rating, stock, price, id } = props
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div className="aspect-[1/1] overflow-hidden rounded-xl">
        <img src={image || ""} className="w-full h-full object-cover" />
      </div>
      <div className="flex gap-2 flex-col">
        <Heading className="capitalize font-lora">{title}</Heading>
        <p>{desc || "No description"}</p>
        <p className="flex gap-2 items-center">
          <Star filled={rating > 0} />
          <span>{rating} out of 5</span>
        </p>
        <p>{stock > 0 ? `${stock} stock available` : "Out of stock"}</p>
        <p>{toIdr(price)}</p>
        <div className="flex-1 flex">
          <DialogConfirmDelete id={id} />
        </div>
      </div>
    </div>
  )
}
