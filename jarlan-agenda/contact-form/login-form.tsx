"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Lock, Users, Eye, EyeOff } from "lucide-react"

export default function Component() {
  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Dados de login:", formData)
    // Aqui você pode adicionar a lógica de autenticação
    alert("Login realizado com sucesso!")
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Users className="h-12 w-12 text-blue-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-white">Agenda de Contatos</CardTitle>
          <CardDescription className="text-gray-300">Sistema de Gerenciamento de Contatos</CardDescription>
          <CardDescription className="text-sm text-gray-400">Faça login para acessar sua agenda</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="usuario" className="text-sm font-medium text-gray-200">
                Usuário
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                <Input
                  id="usuario"
                  name="usuario"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={formData.usuario}
                  onChange={handleInputChange}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-sm font-medium text-gray-200">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                <Input
                  id="senha"
                  name="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-300 hover:text-white focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-blue-400 hover:text-blue-300 hover:underline focus:outline-none focus:underline"
              >
                Esqueci minha senha
              </a>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5">
              Entrar no Sistema
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-400 text-center">Agenda de Contatos</p>
            <p className="text-xs text-gray-500 text-center mt-1">© 2024 - Todos os direitos reservados</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
