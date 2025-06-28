"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Building, Users, Calendar, CalendarDays, Menu } from "lucide-react"
import { USE_MOCK_DATA } from "@/lib/api"

interface NavigationProps {
  title?: string
  subtitle?: string
}

const navigationItems = [
  {
    href: "/",
    label: "Calendário",
    icon: CalendarDays,
  },
  {
    href: "/salas",
    label: "Salas",
    icon: Building,
  },
  {
    href: "/solicitantes",
    label: "Solicitantes",
    icon: Users,
  },
  {
    href: "/reservas",
    label: "Reservas",
    icon: Calendar,
  },
]

export function Navigation({
  title = "Sistema de Reserva de Salas",
  subtitle = "Gerencie salas, solicitantes e reservas",
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const NavigationContent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.href)

        return (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            className={`
              ${
                mobile
                  ? "w-full justify-start text-system-dark hover:bg-system-background"
                  : "text-white hover:bg-white/10"
              }
              ${active && !mobile ? "bg-white/10" : ""}
              ${active && mobile ? "bg-system-secondary text-system-primary" : ""}
            `}
            onClick={() => mobile && setIsOpen(false)}
          >
            <Link href={item.href}>
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Link>
          </Button>
        )
      })}
    </>
  )

  return (
    <header className="bg-system-primary shadow-sm border-b border-system-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Título */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{title}</h1>
            <p className="text-system-secondary/80 text-xs sm:text-sm mt-1 truncate">
              {subtitle}
              {USE_MOCK_DATA && (
                <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-200 rounded text-xs">MODO DEMO</span>
              )}
            </p>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center space-x-2 ml-4">
            <NavigationContent />
          </nav>

          {/* Menu Mobile */}
          <div className="lg:hidden ml-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="Abrir menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-system-surface">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-system-dark">Menu</h2>
                    <p className="text-sm text-system-primary">Navegação</p>
                  </div>
                </div>

                <nav className="flex flex-col space-y-2">
                  <NavigationContent mobile />
                </nav>

                {USE_MOCK_DATA && (
                  <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      <span className="text-sm text-yellow-800 font-medium">Modo Demonstração</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">Usando dados fictícios para demonstração</p>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
