"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface ErrorDialogContextType {
  showError: (title: string, message: string) => void
  hideError: () => void
  isOpen: boolean
  title: string
  message: string
}

const ErrorDialogContext = createContext<ErrorDialogContextType | undefined>(undefined)

export function ErrorDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const showError = (errorTitle: string, errorMessage: string) => {
    setTitle(errorTitle)
    setMessage(errorMessage)
    setIsOpen(true)
  }

  const hideError = () => {
    setIsOpen(false)
    setTitle("")
    setMessage("")
  }

  return (
    <ErrorDialogContext.Provider value={{ showError, hideError, isOpen, title, message }}>
      {children}
    </ErrorDialogContext.Provider>
  )
}

export function useErrorDialog() {
  const context = useContext(ErrorDialogContext)
  if (context === undefined) {
    throw new Error("useErrorDialog must be used within an ErrorDialogProvider")
  }
  return context
}
