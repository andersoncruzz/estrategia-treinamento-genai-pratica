"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Car, Plus, RefreshCw, DollarSign, Trash2 } from "lucide-react"
import { AppSidebar } from "./components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface Combustivel {
  id: number
  tipo: string
  preco: number
  unidade: string
}

const tiposCombustivel = ["Gasolina", "Gasolina Aditivada", "Etanol", "Diesel", "Diesel S-10", "GNV"]

const unidadesMedida = ["litro", "metro cúbico", "galão"]

export default function CombustiveisPage() {
  const [formData, setFormData] = useState({
    tipo: "",
    preco: "",
    unidade: "litro",
  })
  const [combustiveis, setCombustiveis] = useState<Combustivel[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const formatPrice = (value: string) => {
    // Remove tudo que não é dígito ou vírgula/ponto
    const digits = value.replace(/[^\d.,]/g, "")

    // Substitui vírgula por ponto para padronização
    const normalized = digits.replace(",", ".")

    // Limita a 2 casas decimais
    const parts = normalized.split(".")
    if (parts.length > 2) {
      return `${parts[0]}.${parts[1].substring(0, 2)}`
    }
    if (parts[1] && parts[1].length > 2) {
      return `${parts[0]}.${parts[1].substring(0, 2)}`
    }

    return normalized
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(e.target.value)
    setFormData((prev) => ({
      ...prev,
      preco: formatted,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        id: 0, // ID será gerado pelo backend
        tipo: formData.tipo.trim(),
        preco: Number.parseFloat(formData.preco),
        unidade: formData.unidade,
      }

      const response = await fetch("http://127.0.0.1:8000/combustiveis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Combustível cadastrado com sucesso.",
        })
        setFormData({
          tipo: "",
          preco: "",
          unidade: "litro",
        })
        fetchCombustiveis()
      } else {
        throw new Error("Erro ao cadastrar combustível")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar combustível. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchCombustiveis = async () => {
    setLoadingTable(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/combustiveis")
      if (response.ok) {
        const data = await response.json()
        setCombustiveis(data)
      } else {
        throw new Error("Erro ao buscar combustíveis")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar combustíveis.",
        variant: "destructive",
      })
    } finally {
      setLoadingTable(false)
    }
  }

  const deleteCombustivel = async (id: number, tipo: string) => {
    if (!confirm(`Tem certeza que deseja excluir o combustível "${tipo}"?`)) {
      return
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/combustiveis/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Combustível excluído com sucesso.",
        })
        fetchCombustiveis()
      } else {
        throw new Error("Erro ao excluir combustível")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir combustível. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const getTipoColor = (tipo: string) => {
    const colors: { [key: string]: string } = {
      Gasolina: "bg-red-100 text-red-800",
      "Gasolina Aditivada": "bg-red-100 text-red-800",
      Etanol: "bg-green-100 text-green-800",
      Diesel: "bg-yellow-100 text-yellow-800",
      "Diesel S-10": "bg-yellow-100 text-yellow-800",
      GNV: "bg-blue-100 text-blue-800",
    }
    return colors[tipo] || "bg-gray-100 text-gray-800"
  }

  useEffect(() => {
    fetchCombustiveis()
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-gradient-to-r from-red-50 to-yellow-50">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-600">
              COMBUSTÍVEIS
            </h1>
            <p className="text-sm text-gray-600">Cadastro e Gerenciamento de Combustíveis</p>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 bg-white">
          {/* Formulário de Cadastro */}
          <Card className="border-2 border-red-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-yellow-50">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Plus className="h-5 w-5" />
                Cadastrar Novo Combustível
              </CardTitle>
              <CardDescription>Preencha os dados do combustível</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo" className="text-gray-700 font-medium">
                      Tipo de Combustível *
                    </Label>
                    <Select value={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)} required>
                      <SelectTrigger className="border-red-200 focus:border-red-400 focus:ring-red-400">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposCombustivel.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preco" className="text-gray-700 font-medium">
                      Preço (R$) *
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="preco"
                        name="preco"
                        type="text"
                        value={formData.preco}
                        onChange={handlePriceChange}
                        className="pl-10 border-red-200 focus:border-red-400 focus:ring-red-400"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unidade" className="text-gray-700 font-medium">
                      Unidade de Medida *
                    </Label>
                    <Select
                      value={formData.unidade}
                      onValueChange={(value) => handleSelectChange("unidade", value)}
                      required
                    >
                      <SelectTrigger className="border-red-200 focus:border-red-400 focus:ring-red-400">
                        <SelectValue placeholder="Selecione a unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {unidadesMedida.map((unidade) => (
                          <SelectItem key={unidade} value={unidade}>
                            {unidade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white px-8 py-2 font-medium"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Cadastrando...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Cadastrar Combustível
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tabela de Combustíveis */}
          <Card className="border-2 border-yellow-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-red-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-yellow-700">
                    <Car className="h-5 w-5" />
                    Combustíveis Cadastrados
                  </CardTitle>
                  <CardDescription>Lista de todos os combustíveis registrados no sistema</CardDescription>
                </div>
                <Button
                  onClick={fetchCombustiveis}
                  variant="outline"
                  size="sm"
                  disabled={loadingTable}
                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loadingTable ? "animate-spin" : ""}`} />
                  Atualizar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-red-50 to-yellow-50">
                      <TableHead className="text-red-700 font-semibold">ID</TableHead>
                      <TableHead className="text-red-700 font-semibold">Tipo</TableHead>
                      <TableHead className="text-red-700 font-semibold">Preço</TableHead>
                      <TableHead className="text-red-700 font-semibold">Unidade</TableHead>
                      <TableHead className="text-red-700 font-semibold">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingTable ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-red-600" />
                            <span className="text-gray-600">Carregando combustíveis...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : combustiveis.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2">
                            <Car className="h-8 w-8 text-gray-400" />
                            <span className="text-gray-500 font-medium">Nenhum combustível cadastrado</span>
                            <span className="text-gray-400 text-sm">
                              Cadastre o primeiro combustível usando o formulário acima
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      combustiveis.map((combustivel, index) => (
                        <TableRow
                          key={combustivel.id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-red-25"
                          } hover:bg-yellow-25 transition-colors`}
                        >
                          <TableCell className="font-medium text-red-700">{combustivel.id}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(combustivel.tipo)}`}
                            >
                              {combustivel.tipo}
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-medium text-green-700">
                            R$ {combustivel.preco.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-gray-600">por {combustivel.unidade}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteCombustivel(combustivel.id, combustivel.tipo)}
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {combustiveis.length > 0 && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Total de {combustiveis.length} combustível(is) cadastrado(s)</span>
                    <div className="flex items-center gap-4">
                      <span>
                        Preço médio: R${" "}
                        {(combustiveis.reduce((sum, item) => sum + item.preco, 0) / combustiveis.length).toFixed(2)}
                      </span>
                      <span>Tipos: {new Set(combustiveis.map((c) => c.tipo)).size} diferentes</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
