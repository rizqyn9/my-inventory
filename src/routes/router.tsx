import { createHashRouter } from "react-router-dom"
import { ProductMainPage } from "../pages/product"
import { ProductDetailsPage } from "../pages/product/details"
import { ProductCreatePage } from "@/pages/product/create"
import { LoginPage } from "@/pages/auth/login"

export const router = createHashRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/product",
    element: <ProductMainPage />,
  },
  {
    path: "/product/create",
    element: <ProductCreatePage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetailsPage />,
  },
])
