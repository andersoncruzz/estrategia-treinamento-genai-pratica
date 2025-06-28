import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ErrorDialogProvider } from "@/contexts/error-dialog-context"
import { ErrorDialog } from "@/components/error-dialog"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Reserva de Salas",
  description: "Sistema para gerenciar reservas de salas de reunião",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ErrorDialogProvider>
          {children}
          <ErrorDialog />
          <Toaster />
        </ErrorDialogProvider>
      </body>
    </html>
  )
}
