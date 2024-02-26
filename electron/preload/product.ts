import { ipcRenderer } from "electron"
import { ProductDto, CHANNEL_PRODUCT } from "@common/product"

export const productApi = {
  list: (): Promise<WithId<ProductDto>[]> =>
    ipcRenderer.invoke(CHANNEL_PRODUCT.LIST),
  details: (id: string): Promise<WithId<ProductDto>> =>
    ipcRenderer.invoke(CHANNEL_PRODUCT.DETAILS, id),
  create: (data: ProductDto): Promise<{ success: boolean }> =>
    ipcRenderer.invoke(CHANNEL_PRODUCT.CREATE, data),
  remove: (id: string) => ipcRenderer.invoke(CHANNEL_PRODUCT.REMOVE, id),
}
