"use client"

import { AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useErrorDialog } from "@/contexts/error-dialog-context"

export function ErrorDialog() {
  const { isOpen, title, message, hideError } = useErrorDialog()

  return (
    <Dialog open={isOpen} onOpenChange={hideError}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={hideError} className="bg-system-primary hover:bg-system-primary/90">
            Entendi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
