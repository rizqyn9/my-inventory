import { ipcMain } from "electron"
import { getProductObj, productSchema } from "./schema"
import { CHANNEL_PRODUCT, ProductDto, ProductSchema } from "@common/product"
import { ObjectId } from "../realm"
import { sendNotification } from "../other/toast"

ipcMain.handle(CHANNEL_PRODUCT.LIST, async () => {
  const products = getProductObj().toJSON() as ProductSchema[]

  return products.reduce<WithId<ProductDto>[]>(
    (prev, curr) => [...prev, { id: curr._id.toString(), ...curr }],
    []
  )
})

ipcMain.handle(
  CHANNEL_PRODUCT.DETAILS,
  async (_, id: string): Promise<WithId<ProductDto> | null> => {
    const results = getProductObj()
      .filtered("_id == $0", ObjectId(id))
      .toJSON() as ProductSchema[]

    const product = results?.[0]
    if (!product) return null
    return {
      ...product,
      id: product._id.toString(),
    }
  }
)

ipcMain.handle(CHANNEL_PRODUCT.CREATE, async (_, product: ProductDto) => {
  realm.write(() => {
    realm.create(productSchema.name, product)
  })

  sendNotification({
    msg: `Success added new product`,
  })
})

ipcMain.handle(CHANNEL_PRODUCT.REMOVE, async (_, producId: string) => {
  const selected = getProductObj().filtered("_id == $0", ObjectId(producId))
  const products = selected.toJSON()

  if (!selected.length) {
    const msg = "Product not found"
    sendNotification({ msg })
    return { success: false, msg }
  }

  realm.write(() => {
    realm.delete(selected)
  })

  const msg = `${products.map((x) => x.title).join(", ")} deleted`

  sendNotification({ msg })
  return {
    success: true,
    msg,
  }
})
