"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Fuel, Plus, RefreshCw, Trash2 } from "lucide-react"
import { AppSidebar } from "./components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface Abastecimento {
  id: number
  posto_id: number
  condutor_id: number
  combustivel_id: number
  data: string
  quantidade: number
  valor_total: number
}

export default function AbastecimentoPage() {
  const [formData, setFormData] = useState({
    posto_id: "",
    condutor_id: "",
    combustivel_id: "",
    data: "",
    quantidade: "",
    valor_total: "",
  })
  const [abastecimentos, setAbastecimentos] = useState<Abastecimento[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        id: 0, // ID será gerado pelo backend
        posto_id: Number.parseInt(formData.posto_id),
        condutor_id: Number.parseInt(formData.condutor_id),
        combustivel_id: Number.parseInt(formData.combustivel_id),
        data: new Date(formData.data).toISOString(),
        quantidade: Number.parseFloat(formData.quantidade),
        valor_total: Number.parseFloat(formData.valor_total),
      }

      const response = await fetch("http://127.0.0.1:8000/abastecimentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Abastecimento cadastrado com sucesso.",
        })
        setFormData({
          posto_id: "",
          condutor_id: "",
          combustivel_id: "",
          data: "",
          quantidade: "",
          valor_total: "",
        })
        fetchAbastecimentos()
      } else {
        throw new Error("Erro ao cadastrar abastecimento")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar abastecimento. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchAbastecimentos = async () => {
    setLoadingTable(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/abastecimentos")
      if (response.ok) {
        const data = await response.json()
        setAbastecimentos(data)
      } else {
        throw new Error("Erro ao buscar abastecimentos")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar abastecimentos.",
        variant: "destructive",
      })
    } finally {
      setLoadingTable(false)
    }
  }

  const deleteAbastecimento = async (id: number) => {
    if (!confirm(`Tem certeza que deseja excluir o abastecimento ID ${id}?`)) {
      return
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/abastecimentos/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Abastecimento excluído com sucesso.",
        })
        fetchAbastecimentos()
      } else {
        throw new Error("Erro ao excluir abastecimento")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir abastecimento. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchAbastecimentos()
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
              ABASTECIMENTOS
            </h1>
            <p className="text-sm text-gray-600">Cadastro e Gerenciamento de Abastecimentos</p>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 bg-white">
          {/* Formulário de Cadastro */}
          <Card className="border-2 border-red-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-yellow-50">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Plus className="h-5 w-5" />
                Cadastrar Novo Abastecimento
              </CardTitle>
              <CardDescription>Preencha os dados do abastecimento</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="posto_id" className="text-gray-700 font-medium">
                      ID do Posto *
                    </Label>
                    <Input
                      id="posto_id"
                      name="posto_id"
                      type="number"
                      value={formData.posto_id}
                      onChange={handleInputChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      placeholder="Ex: 1"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condutor_id" className="text-gray-700 font-medium">
                      ID do Condutor *
                    </Label>
                    <Input
                      id="condutor_id"
                      name="condutor_id"
                      type="number"
                      value={formData.condutor_id}
                      onChange={handleInputChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      placeholder="Ex: 1"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="combustivel_id" className="text-gray-700 font-medium">
                      ID do Combustível *
                    </Label>
                    <Input
                      id="combustivel_id"
                      name="combustivel_id"
                      type="number"
                      value={formData.combustivel_id}
                      onChange={handleInputChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      placeholder="Ex: 1"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data" className="text-gray-700 font-medium">
                      Data e Hora *
                    </Label>
                    <Input
                      id="data"
                      name="data"
                      type="datetime-local"
                      value={formData.data}
                      onChange={handleInputChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantidade" className="text-gray-700 font-medium">
                      Quantidade (L) *
                    </Label>
                    <Input
                      id="quantidade"
                      name="quantidade"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.quantidade}
                      onChange={handleInputChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      placeholder="Ex: 45.50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor_total" className="text-gray-700 font-medium">
                      Valor Total (R$) *
                    </Label>
                    <Input
                      id="valor_total"
                      name="valor_total"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.valor_total}
                      onChange={handleInputChange}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                      placeholder="Ex: 285.75"
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
                        Cadastrar Abastecimento
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tabela de Abastecimentos */}
          <Card className="border-2 border-yellow-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-red-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-yellow-700">
                    <Fuel className="h-5 w-5" />
                    Abastecimentos Cadastrados
                  </CardTitle>
                  <CardDescription>Lista de todos os abastecimentos registrados no sistema</CardDescription>
                </div>
                <Button
                  onClick={fetchAbastecimentos}
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
                      <TableHead className="text-red-700 font-semibold">Posto ID</TableHead>
                      <TableHead className="text-red-700 font-semibold">Condutor ID</TableHead>
                      <TableHead className="text-red-700 font-semibold">Combustível ID</TableHead>
                      <TableHead className="text-red-700 font-semibold">Data</TableHead>
                      <TableHead className="text-red-700 font-semibold">Quantidade (L)</TableHead>
                      <TableHead className="text-red-700 font-semibold">Valor Total (R$)</TableHead>
                      <TableHead className="text-red-700 font-semibold">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingTable ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-red-600" />
                            <span className="text-gray-600">Carregando abastecimentos...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : abastecimentos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2">
                            <Fuel className="h-8 w-8 text-gray-400" />
                            <span className="text-gray-500 font-medium">Nenhum abastecimento cadastrado</span>
                            <span className="text-gray-400 text-sm">
                              Cadastre o primeiro abastecimento usando o formulário acima
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      abastecimentos.map((abastecimento, index) => (
                        <TableRow
                          key={abastecimento.id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-red-25"
                          } hover:bg-yellow-25 transition-colors`}
                        >
                          <TableCell className="font-medium text-red-700">{abastecimento.id}</TableCell>
                          <TableCell>{abastecimento.posto_id}</TableCell>
                          <TableCell>{abastecimento.condutor_id}</TableCell>
                          <TableCell>{abastecimento.combustivel_id}</TableCell>
                          <TableCell className="font-mono text-sm">
                            {new Date(abastecimento.data).toLocaleString("pt-BR")}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {abastecimento.quantidade.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-medium text-green-700">
                            R$ {abastecimento.valor_total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteAbastecimento(abastecimento.id)}
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

              {abastecimentos.length > 0 && (
                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Total de {abastecimentos.length} abastecimento(s) cadastrado(s)</span>
                    <span>
                      Valor total: R$ {abastecimentos.reduce((sum, item) => sum + item.valor_total, 0).toFixed(2)}
                    </span>
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
