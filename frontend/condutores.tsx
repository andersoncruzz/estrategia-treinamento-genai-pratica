"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Users, Plus, RefreshCw, User, Car, Trash2 } from "lucide-react"
import { AppSidebar } from "./components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface Condutor {
  id: number
  nome: string
  cpf: string
  veiculo: string
}

export default function CondutoresPage() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    veiculo: "",
  })
  const [condutores, setCondutores] = useState<Condutor[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const formatCPF = (value: string) => {
    // Remove tudo que não é dígito
    const digits = value.replace(/\D/g, "")

    // Aplica a máscara XXX.XXX.XXX-XX
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    setFormData((prev) => ({
      ...prev,
      cpf: formatted,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        id: 0, // ID será gerado pelo backend
        nome: formData.nome.trim(),
        cpf: formData.cpf.replace(/\D/g, ""), // Remove formatação para enviar apenas números
        veiculo: formData.veiculo.trim(),
      }

      const response = await fetch("http://127.0.0.1:8000/condutores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Condutor cadastrado com sucesso.",
        })
        setFormData({
          nome: "",
          cpf: "",
          veiculo: "",
        })
        fetchCondutores()
      } else {
        throw new Error("Erro ao cadastrar condutor")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar condutor. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchCondutores = async () => {
    setLoadingTable(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/condutores")
      if (response.ok) {
        const data = await response.json()
        setCondutores(data)
      } else {
        throw new Error("Erro ao buscar condutores")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar condutores.",
        variant: "destructive",
      })
    } finally {
      setLoadingTable(false)
    }
  }

  const deleteCondutor = async (id: number, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir o condutor "${nome}"?`)) {
      return
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/condutores/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Condutor excluído com sucesso.",
        })
        fetchCondutores()
      } else {
        throw new Error("Erro ao excluir condutor")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir condutor. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const formatCPFDisplay = (cpf: string) => {
    // Se já está formatado, retorna como está
    if (cpf.includes(".") || cpf.includes("-")) {
      return cpf
    }
    // Se não está formatado, aplica a formatação
    return formatCPF(cpf)
  }

  const getVehicleIcon = (veiculo: string) => {
    const vehicleLower = veiculo.toLowerCase()
    if (vehicleLower.includes("moto") || vehicleLower.includes("bike")) {
      return "🏍️"
    }
    if (vehicleLower.includes("caminhão") || vehicleLower.includes("truck")) {
      return "🚛"
    }
    if (vehicleLower.includes("van") || vehicleLower.includes("kombi")) {
      return "🚐"
    }
    return "🚗" // Carro padrão
  }

  useEffect(() => {
    fetchCondutores()
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
              CONDUTORES
            </h1>
            <p className="text-sm text-gray-600">Cadastro e Gerenciamento de Condutores</p>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 bg-white">
          {/* Formulário de Cadastro */}
          <Card className="border-2 border-red-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-yellow-50">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Plus className="h-5 w-5" />
                Cadastrar Novo Condutor
              </CardTitle>
              <CardDescription>Preencha os dados do condutor</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-gray-700 font-medium">
                      Nome Completo *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="nome"
                        name="nome"
                        type="text"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className="pl-10 border-red-200 focus:border-red-400 focus:ring-red-400"
                        placeholder="Ex: João Silva Santos"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-gray-700 font-medium">
                      CPF *
                    </Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      type="text"
                      value={formData.cpf}
                      onChange={handleCPFChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      placeholder="XXX.XXX.XXX-XX"
                      maxLength={14}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="veiculo" className="text-gray-700 font-medium">
                      Veículo *
                    </Label>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="veiculo"
                        name="veiculo"
                        type="text"
                        value={formData.veiculo}
                        onChange={handleInputChange}
                        className="pl-10 border-red-200 focus:border-red-400 focus:ring-red-400"
                        placeholder="Ex: Honda Civic 2020, Yamaha Fazer 250, Ford Transit"
                        required
                      />
                    </div>
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
                        Cadastrar Condutor
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tabela de Condutores */}
          <Card className="border-2 border-yellow-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-red-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-yellow-700">
                    <Users className="h-5 w-5" />
                    Condutores Cadastrados
                  </CardTitle>
                  <CardDescription>Lista de todos os condutores registrados no sistema</CardDescription>
                </div>
                <Button
                  onClick={fetchCondutores}
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
                      <TableHead className="text-red-700 font-semibold">Nome</TableHead>
                      <TableHead className="text-red-700 font-semibold">CPF</TableHead>
                      <TableHead className="text-red-700 font-semibold">Veículo</TableHead>
                      <TableHead className="text-red-700 font-semibold">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingTable ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-red-600" />
                            <span className="text-gray-600">Carregando condutores...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : condutores.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2">
                            <Users className="h-8 w-8 text-gray-400" />
                            <span className="text-gray-500 font-medium">Nenhum condutor cadastrado</span>
                            <span className="text-gray-400 text-sm">
                              Cadastre o primeiro condutor usando o formulário acima
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      condutores.map((condutor, index) => (
                        <TableRow
                          key={condutor.id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-red-25"
                          } hover:bg-yellow-25 transition-colors`}
                        >
                          <TableCell className="font-medium text-red-700">{condutor.id}</TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {condutor.nome.charAt(0).toUpperCase()}
                              </div>
                              {condutor.nome}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{formatCPFDisplay(condutor.cpf)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getVehicleIcon(condutor.veiculo)}</span>
                              <span className="text-sm text-gray-700">{condutor.veiculo}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteCondutor(condutor.id, condutor.nome)}
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

              {condutores.length > 0 && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Total de {condutores.length} condutor(es) cadastrado(s)</span>
                    <div className="flex items-center gap-4">
                      <span>
                        Veículos únicos: {new Set(condutores.map((c) => c.veiculo.toLowerCase())).size} diferentes
                      </span>
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
