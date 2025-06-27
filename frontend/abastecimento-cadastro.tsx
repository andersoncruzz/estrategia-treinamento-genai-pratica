"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Fuel, Plus, RefreshCw } from "lucide-react"

interface Abastecimento {
  id: number
  posto_id: number
  condutor_id: number
  combustivel_id: number
  data: string
  quantidade: number
  valor_total: number
}

export default function Component() {
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
        posto_id: Number.parseInt(formData.posto_id),
        condutor_id: Number.parseInt(formData.condutor_id),
        combustivel_id: Number.parseInt(formData.combustivel_id),
        data: formData.data,
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

  useEffect(() => {
    fetchAbastecimentos()
  }, [])

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full">
              <Fuel className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
            Sistema de Abastecimento
          </h1>
          <p className="text-gray-600">Cadastre e gerencie os abastecimentos</p>
        </div>

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
                    ID do Posto
                  </Label>
                  <Input
                    id="posto_id"
                    name="posto_id"
                    type="number"
                    value={formData.posto_id}
                    onChange={handleInputChange}
                    className="border-red-200 focus:border-red-400 focus:ring-red-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condutor_id" className="text-gray-700 font-medium">
                    ID do Condutor
                  </Label>
                  <Input
                    id="condutor_id"
                    name="condutor_id"
                    type="number"
                    value={formData.condutor_id}
                    onChange={handleInputChange}
                    className="border-red-200 focus:border-red-400 focus:ring-red-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="combustivel_id" className="text-gray-700 font-medium">
                    ID do Combustível
                  </Label>
                  <Input
                    id="combustivel_id"
                    name="combustivel_id"
                    type="number"
                    value={formData.combustivel_id}
                    onChange={handleInputChange}
                    className="border-red-200 focus:border-red-400 focus:ring-red-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data" className="text-gray-700 font-medium">
                    Data e Hora
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
                    Quantidade (L)
                  </Label>
                  <Input
                    id="quantidade"
                    name="quantidade"
                    type="number"
                    step="0.01"
                    value={formData.quantidade}
                    onChange={handleInputChange}
                    className="border-red-200 focus:border-red-400 focus:ring-red-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor_total" className="text-gray-700 font-medium">
                    Valor Total (R$)
                  </Label>
                  <Input
                    id="valor_total"
                    name="valor_total"
                    type="number"
                    step="0.01"
                    value={formData.valor_total}
                    onChange={handleInputChange}
                    className="border-red-200 focus:border-red-400 focus:ring-red-400"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white px-8 py-2"
                >
                  {loading ? "Cadastrando..." : "Cadastrar Abastecimento"}
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
                <CardDescription>Lista de todos os abastecimentos registrados</CardDescription>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingTable ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Carregando...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : abastecimentos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        Nenhum abastecimento cadastrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    abastecimentos.map((abastecimento, index) => (
                      <TableRow
                        key={abastecimento.id}
                        className={index % 2 === 0 ? "bg-red-25" : "bg-white hover:bg-yellow-25"}
                      >
                        <TableCell className="font-medium">{abastecimento.id}</TableCell>
                        <TableCell>{abastecimento.posto_id}</TableCell>
                        <TableCell>{abastecimento.condutor_id}</TableCell>
                        <TableCell>{abastecimento.combustivel_id}</TableCell>
                        <TableCell>{new Date(abastecimento.data).toLocaleString("pt-BR")}</TableCell>
                        <TableCell>{abastecimento.quantidade.toFixed(2)}</TableCell>
                        <TableCell>R$ {abastecimento.valor_total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
