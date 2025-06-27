import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gerenciador de tarefas',
  description: 'Gerencie suas tarefas',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
