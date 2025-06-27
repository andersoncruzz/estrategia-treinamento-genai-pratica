"use client"

import type * as React from "react"
import { Car, Fuel, MapPin, Users, Building2, Home } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Menu items
const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Abastecimento",
    url: "/abastecimento",
    icon: Fuel,
  },
  {
    title: "Postos",
    url: "/postos",
    icon: Building2,
  },
  {
    title: "Combustíveis",
    url: "/combustiveis",
    icon: Car,
  },
  {
    title: "Condutores",
    url: "/condutores",
    icon: Users,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="bg-gradient-to-r from-red-600 to-yellow-600 text-white">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-wide">RADARFUEL</h2>
            <p className="text-sm opacity-90">Sistema de Monitoramento</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-red-700 font-semibold">Navegação Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-gradient-to-r hover:from-red-50 hover:to-yellow-50 hover:text-red-700"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
