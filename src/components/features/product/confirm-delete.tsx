import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

type DialogConfirmDeleteProps = {
  id: string | null
}

export function DialogConfirmDelete(props: DialogConfirmDeleteProps) {
  const { id } = props
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleOnSubmit = useCallback(() => {
    if (!id) return
    window.api.product.remove(id).then(() => navigate("/product"))
  }, [id, navigate])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="h-min mt-auto ml-auto">
        <Button>Remove</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleOnSubmit}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
