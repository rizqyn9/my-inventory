import Realm from "realm"
import type { ProductSchema } from "@common/product/dto"

export const productSchema: Realm.ObjectSchema = {
  name: "product",
  properties: {
    _id: { type: "objectId", default: () => new Realm.BSON.ObjectID() },
    desc: "string",
    image: "string",
    price: "int",
    rating: "double",
    stock: "int",
    title: "string",
    createdAt: { type: "date", default: () => new Date() },
  },
  primaryKey: "_id",
}

export function getProductObj() {
  return realm.objects<ProductSchema>(productSchema.name)
}
