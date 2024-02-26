import { z } from "zod"
import type Realm from "realm"

export const productDto = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().url("Image is required"),
  price: z
    .number({
      invalid_type_error: "Stock is required",
    })
    .positive("Price must be positive"),
  stock: z
    .number({
      invalid_type_error: "Stock is required",
    })
    .positive("Price must be positive"),
  desc: z.string().min(1, "Description is required"),
  rating: z
    .number({
      invalid_type_error: "Stock is required",
    })
    .positive()
    .max(5, "Rating can't greater than 5"),
})

export type ProductDto = z.infer<typeof productDto>

export type ProductSchema = ProductDto & { _id: Realm.BSON.ObjectId }
