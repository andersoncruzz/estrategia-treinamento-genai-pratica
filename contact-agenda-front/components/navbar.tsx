"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Users, Plus, Search, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Novo Contato",
    href: "/",
    icon: Plus,
    description: "Adicionar novo contato",
  },
  // {
  //   name: "Pesquisar",
  //   href: "/search",
  //   icon: Search,
  //   description: "Buscar contatos por nome",
  // },
  {
    name: "Todos os Contatos",
    href: "/contacts",
    icon: Users,
    description: "Ver todos os contatos",
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Agenda</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2",
                      isActive && "bg-blue-600 text-white hover:bg-blue-700",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">Agenda</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                      <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                        <div
                          className={cn(
                            "flex items-center space-x-3 rounded-lg px-3 py-3 text-sm transition-colors",
                            isActive
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "text-gray-700 hover:bg-gray-100",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                <div className="mt-8 pt-4 border-t">
                  <div className="text-xs text-gray-500 text-center">Agenda de Contatos v1.0</div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
