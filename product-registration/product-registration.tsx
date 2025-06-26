"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Package, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cadastrarProduto } from "@/lib/api-client"

export default function Component() {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    descricao: "",
    dataVencimento: "",
  })

  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.nome || !formData.preco || !formData.descricao || !formData.dataVencimento) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    try {
      await cadastrarProduto(formData)
      toast({
        title: "Sucesso!",
        description: "Produto cadastrado com sucesso.",
      })
      setFormData({
        nome: "",
        preco: "",
        descricao: "",
        dataVencimento: "",
      })
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Não foi possível cadastrar o produto.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      nome: "",
      preco: "",
      descricao: "",
      dataVencimento: "",
    })

    toast({
      title: "Cancelado",
      description: "Formulário foi limpo.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Cadastro de Produto</CardTitle>
            <CardDescription className="text-gray-600">
              Preencha as informações do produto para cadastrá-lo no sistema
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome do Produto */}
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                  Nome do Produto *
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite o nome do produto"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              {/* Preço */}
              <div className="space-y-2">
                <Label htmlFor="preco" className="text-sm font-medium text-gray-700">
                  Preço (R$) *
                </Label>
                <Input
                  id="preco"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={formData.preco}
                  onChange={(e) => handleInputChange("preco", e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                  Descrição *
                </Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva as características e detalhes do produto"
                  value={formData.descricao}
                  onChange={(e) => handleInputChange("descricao", e.target.value)}
                  className="w-full min-h-[100px] resize-none"
                  required
                />
              </div>

              {/* Data de Vencimento */}
              <div className="space-y-2">
                <Label htmlFor="dataVencimento" className="text-sm font-medium text-gray-700">
                  Data de Vencimento *
                </Label>
                <div className="relative">
                  <Input
                    id="dataVencimento"
                    type="date"
                    value={formData.dataVencimento}
                    onChange={(e) => handleInputChange("dataVencimento", e.target.value)}
                    className="w-full"
                    required
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Cadastrar Produto
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>

            <div className="text-xs text-gray-500 text-center pt-4 border-t">* Campos obrigatórios</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
