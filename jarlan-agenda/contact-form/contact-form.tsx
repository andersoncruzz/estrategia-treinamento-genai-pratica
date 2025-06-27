"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Phone, Mail, FileText, UserPlus } from "lucide-react"
import { cadastrarContato } from "./contact-api-client"

export default function Component({
  contatoEditando = null,
  onVoltarConsulta = () => {},
  onNovoContato = () => {},
}: {
  contatoEditando?: any
  onVoltarConsulta?: () => void
  onNovoContato?: () => void
}) {
  const [formData, setFormData] = useState({
    id: contatoEditando?.id || null,
    nome: contatoEditando?.nome || "",
    telefone: contatoEditando?.telefone || "",
    email: contatoEditando?.email || "",
    observacao: contatoEditando?.observacao || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    if (contatoEditando) {
      setFormData({
        id: contatoEditando.id,
        nome: contatoEditando.nome,
        telefone: contatoEditando.telefone,
        email: contatoEditando.email,
        observacao: contatoEditando.observacao || "",
      })
    } else {
      setFormData({
        id: null,
        nome: "",
        telefone: "",
        email: "",
        observacao: "",
      })
    }
    setMessage(null)
  }, [contatoEditando])

  // Máscara de telefone para 8 ou 9 dígitos, impede letras
  function maskTelefone(value: string) {
    // Remove tudo que não for número
    let v = value.replace(/[^0-9]/g, "")
    if (v.length > 11) v = v.slice(0, 11)
    if (v.length > 10) {
      return v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    } else if (v.length > 6) {
      return v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, "($1) $2-$3")
    } else if (v.length > 2) {
      return v.replace(/(\d{2})(\d{0,5})/, "($1) $2")
    } else {
      return v
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "telefone") {
      // Só aceita números
      setFormData((prev) => ({ ...prev, telefone: maskTelefone(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    if (message) setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    try {
      const payload = {
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email,
        observacao: formData.observacao || "",
      }
      const isEdit = !!formData.id
      let response
      if (isEdit) {
        // PUT direto (mantém como está)
        const url = `http://localhost:8080/api/contatos/${formData.id}`
        response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        // POST usando client
        response = await cadastrarContato(payload)
      }
      if (response.ok) {
        onVoltarConsulta()
        return
      } else {
        const errorData = await response.json().catch(() => ({}))
        setMessage({ type: "error", text: errorData.message || "Erro ao salvar contato" })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Erro de conexão com a API" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    if (formData.id) {
      // Se estiver editando, cancelar edição
      onVoltarConsulta()
    } else {
      setFormData({ id: null, nome: "", telefone: "", email: "", observacao: "" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <UserPlus className="h-6 w-6 text-blue-400" />
            {formData.id ? "Editar Contato" : "Cadastro de Contato"}
          </CardTitle>
          <CardDescription>Preencha os dados para {formData.id ? "editar" : "adicionar um novo"} contato</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="id" value={formData.id || ""} />
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-sm font-medium text-gray-200">
                Nome *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Digite o nome completo"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-sm font-medium text-gray-200">
                Telefone *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  required
                  disabled={isLoading}
                  inputMode="numeric"
                  pattern="[0-9()\-\s]+"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                E-mail *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacao" className="text-sm font-medium text-gray-200">
                Observação
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                <Textarea
                  id="observacao"
                  name="observacao"
                  placeholder="Informações adicionais sobre o contato..."
                  value={formData.observacao || ""}
                  onChange={handleInputChange}
                  className="pl-10 min-h-[80px] resize-none bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gray-900 hover:bg-gray-600 text-white border border-gray-700 hover:border-gray-500"
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : formData.id ? "Salvar Alterações" : "Salvar Contato"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                disabled={isLoading}
              >
                {formData.id ? "Cancelar" : "Limpar"}
              </Button>
            </div>
            {message && (
              <div className={`text-center text-sm mt-2 ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
                {message.text}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
