"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Building2, Plus, RefreshCw, MapPin, Trash2 } from "lucide-react"
import { AppSidebar } from "./components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface Posto {
  id: number
  nome: string
  endereco: string
  bandeira: string
  cnpj: string
}

export default function PostosPage() {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    bandeira: "",
    cnpj: "",
  })
  const [postos, setPostos] = useState<Posto[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const formatCNPJ = (value: string) => {
    // Remove tudo que não é dígito
    const digits = value.replace(/\D/g, "")

    // Aplica a máscara XX.XXX.XXX/XXXX-XX
    if (digits.length <= 2) return digits
    if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
    if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
    if (digits.length <= 12)
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`
  }

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value)
    setFormData((prev) => ({
      ...prev,
      cnpj: formatted,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        id: 0, // ID será gerado pelo backend
        nome: formData.nome.trim(),
        endereco: formData.endereco.trim(),
        bandeira: formData.bandeira.trim(),
        cnpj: formData.cnpj.replace(/\D/g, ""), // Remove formatação para enviar apenas números
      }

      const response = await fetch("http://127.0.0.1:8000/postos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Posto cadastrado com sucesso.",
        })
        setFormData({
          nome: "",
          endereco: "",
          bandeira: "",
          cnpj: "",
        })
        fetchPostos()
      } else {
        throw new Error("Erro ao cadastrar posto")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar posto. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchPostos = async () => {
    setLoadingTable(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/postos")
      if (response.ok) {
        const data = await response.json()
        setPostos(data)
      } else {
        throw new Error("Erro ao buscar postos")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar postos.",
        variant: "destructive",
      })
    } finally {
      setLoadingTable(false)
    }
  }

  const deletePosto = async (id: number, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir o posto "${nome}"?`)) {
      return
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/postos/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Posto excluído com sucesso.",
        })
        fetchPostos()
      } else {
        throw new Error("Erro ao excluir posto")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir posto. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const formatCNPJDisplay = (cnpj: string) => {
    // Se já está formatado, retorna como está
    if (cnpj.includes(".") || cnpj.includes("/") || cnpj.includes("-")) {
      return cnpj
    }
    // Se não está formatado, aplica a formatação
    return formatCNPJ(cnpj)
  }

  useEffect(() => {
    fetchPostos()
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
              POSTOS DE COMBUSTÍVEL
            </h1>
            <p className="text-sm text-gray-600">Cadastro e Gerenciamento de Postos</p>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 bg-white">
          {/* Formulário de Cadastro */}
          <Card className="border-2 border-red-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-yellow-50">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Plus className="h-5 w-5" />
                Cadastrar Novo Posto
              </CardTitle>
              <CardDescription>Preencha os dados do posto de combustível</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-gray-700 font-medium">
                      Nome do Posto *
                    </Label>
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      placeholder="Ex: Posto Ipiranga Centro"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bandeira" className="text-gray-700 font-medium">
                      Bandeira *
                    </Label>
                    <Input
                      id="bandeira"
                      name="bandeira"
                      type="text"
                      value={formData.bandeira}
                      onChange={handleInputChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      placeholder="Ex: Ipiranga, Shell, BR, Ale"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="endereco" className="text-gray-700 font-medium">
                      Endereço Completo *
                    </Label>
                    <Input
                      id="endereco"
                      name="endereco"
                      type="text"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      placeholder="Ex: Av. Djalma Batista, 1000 - Chapada, Manaus - AM"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cnpj" className="text-gray-700 font-medium">
                      CNPJ *
                    </Label>
                    <Input
                      id="cnpj"
                      name="cnpj"
                      type="text"
                      value={formData.cnpj}
                      onChange={handleCNPJChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      placeholder="XX.XXX.XXX/XXXX-XX"
                      maxLength={18}
                      required
                    />
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
                        Cadastrar Posto
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tabela de Postos */}
          <Card className="border-2 border-yellow-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-red-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-yellow-700">
                    <Building2 className="h-5 w-5" />
                    Postos Cadastrados
                  </CardTitle>
                  <CardDescription>Lista de todos os postos de combustível registrados no sistema</CardDescription>
                </div>
                <Button
                  onClick={fetchPostos}
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
                      <TableHead className="text-red-700 font-semibold">Bandeira</TableHead>
                      <TableHead className="text-red-700 font-semibold">Endereço</TableHead>
                      <TableHead className="text-red-700 font-semibold">CNPJ</TableHead>
                      <TableHead className="text-red-700 font-semibold">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingTable ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-red-600" />
                            <span className="text-gray-600">Carregando postos...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : postos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2">
                            <Building2 className="h-8 w-8 text-gray-400" />
                            <span className="text-gray-500 font-medium">Nenhum posto cadastrado</span>
                            <span className="text-gray-400 text-sm">
                              Cadastre o primeiro posto usando o formulário acima
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      postos.map((posto, index) => (
                        <TableRow
                          key={posto.id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-red-25"
                          } hover:bg-yellow-25 transition-colors`}
                        >
                          <TableCell className="font-medium text-red-700">{posto.id}</TableCell>
                          <TableCell className="font-medium">{posto.nome}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {posto.bandeira}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="flex items-start gap-1">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700 line-clamp-2">{posto.endereco}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{formatCNPJDisplay(posto.cnpj)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deletePosto(posto.id, posto.nome)}
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

              {postos.length > 0 && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Total de {postos.length} posto(s) cadastrado(s)</span>
                    <div className="flex items-center gap-4">
                      <span>Bandeiras: {new Set(postos.map((p) => p.bandeira)).size} diferentes</span>
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
