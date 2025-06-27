import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <footer className="w-full text-center py-4 bg-gray-100 text-gray-700 text-sm border-t mt-8">
            Curso: [I.A] Generativa para DevOps: aumentando a produtividade de desenvolvedores de software
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
