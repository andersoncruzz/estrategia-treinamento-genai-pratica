"use client"

import { useState } from "react"
import { MapPin, Fuel, Clock, DollarSign, Users, Car } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dados simulados de abastecimentos com coordenadas de Manaus
const mockAbastecimentos = [
  {
    id: 1,
    posto: "Posto Ipiranga Centro",
    lat: -3.119,
    lng: -60.0217,
    combustivel: "Gasolina",
    quantidade: 45.5,
    valor: 285.75,
    data: "2024-01-15T10:30:00",
    condutor: "João Silva",
  },
  {
    id: 2,
    posto: "Shell Adrianópolis",
    lat: -3.0892,
    lng: -60.0217,
    combustivel: "Etanol",
    quantidade: 38.2,
    valor: 198.4,
    data: "2024-01-15T14:15:00",
    condutor: "Maria Santos",
  },
  {
    id: 3,
    posto: "BR Petrobras Zona Norte",
    lat: -3.0583,
    lng: -60.0217,
    combustivel: "Diesel",
    quantidade: 52.0,
    valor: 312.0,
    data: "2024-01-15T16:45:00",
    condutor: "Carlos Lima",
  },
  {
    id: 4,
    posto: "Ale Combustíveis Aleixo",
    lat: -3.0892,
    lng: -59.9647,
    combustivel: "Gasolina",
    quantidade: 41.8,
    valor: 262.3,
    data: "2024-01-15T09:20:00",
    condutor: "Ana Costa",
  },
  {
    id: 5,
    posto: "Texaco Flores",
    lat: -3.1319,
    lng: -60.0217,
    combustivel: "Gasolina",
    quantidade: 35.0,
    valor: 220.5,
    data: "2024-01-15T11:10:00",
    condutor: "Pedro Oliveira",
  },
]

export function FuelMap() {
  const [selectedLocation, setSelectedLocation] = useState<(typeof mockAbastecimentos)[0] | null>(null)

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Mapa Principal */}
      <div className="flex-1">
        <Card className="h-full border-2 border-red-100">
          <CardHeader className="bg-gradient-to-r from-red-50 to-yellow-50">
            <CardTitle className="flex items-center gap-2 text-red-700">
              <MapPin className="h-5 w-5" />
              Mapa de Abastecimentos - Manaus
            </CardTitle>
            <CardDescription>Visualização dos locais onde foram realizados abastecimentos</CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-5rem)]">
            <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
              {/* Simulação do mapa de Manaus */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-green-200">
                {/* Rio Negro simulado */}
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-300 to-blue-400 opacity-60"></div>

                {/* Marcadores dos postos */}
                {mockAbastecimentos.map((abastecimento, index) => {
                  const x = 20 + index * 15 + (index % 3) * 10
                  const y = 25 + index * 12 + (index % 2) * 15

                  return (
                    <div
                      key={abastecimento.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                      onClick={() => setSelectedLocation(abastecimento)}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Fuel className="h-4 w-4 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {abastecimento.posto}
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Legenda do mapa */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Legenda</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></div>
                    <span>Postos de Combustível</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                    <span>Abastecimento Recente</span>
                  </div>
                </div>

                {/* Título da cidade */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <h3 className="font-bold text-gray-800">MANAUS - AM</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Painel de Informações */}
      <div className="w-full lg:w-80">
        <Card className="h-full border-2 border-yellow-100">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-red-50">
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <Fuel className="h-5 w-5" />
              Detalhes do Abastecimento
            </CardTitle>
            <CardDescription>
              {selectedLocation ? "Informações do local selecionado" : "Clique em um marcador no mapa"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {selectedLocation ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{selectedLocation.posto}</h3>
                  <Badge variant="outline" className="mt-1">
                    ID: {selectedLocation.id}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Condutor:</strong> {selectedLocation.condutor}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Combustível:</strong> {selectedLocation.combustivel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Quantidade:</strong> {selectedLocation.quantidade}L
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Valor:</strong> R$ {selectedLocation.valor.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Data:</strong> {new Date(selectedLocation.data).toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    <strong>Coordenadas:</strong>
                    <br />
                    Lat: {selectedLocation.lat}
                    <br />
                    Lng: {selectedLocation.lng}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Selecione um marcador no mapa para ver os detalhes do abastecimento</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
