"use client"

import { AppSidebar } from "./components/app-sidebar"
import { FuelMap } from "./components/fuel-map"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-gradient-to-r from-red-50 to-yellow-50">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-600">
              RADARFUEL MANAUS V1.0
            </h1>
            <p className="text-sm text-gray-600">Sistema de Monitoramento de Abastecimentos</p>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 h-[calc(100vh-4rem)]">
          <FuelMap />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
