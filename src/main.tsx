import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router.tsx"
import { Toaster } from "./components/ui/sonner.tsx"
import { QueryClientProvider, QueryClient } from "react-query"
import "./main.css"

// eslint-disable-next-line react-refresh/only-export-components
function RootNode() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={new QueryClient()}>
        <Toaster position="top-center" duration={1_000} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<RootNode />)
