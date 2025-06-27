"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Users, Loader2, Mail, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useErrorDialog } from "@/contexts/error-dialog-context"
import { API_ENDPOINTS, USE_MOCK_DATA } from "@/lib/api"
import { MOCK_SOLICITANTES, mockDelay, type Solicitante } from "@/lib/mock-data"
import { Navigation } from "@/components/navigation"

export default function SolicitantesPage() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [solicitantes, setSolicitantes] = useState<Solicitante[]>([])
  const [isLoadingSolicitantes, setIsLoadingSolicitantes] = useState(true)
  const { toast } = useToast()
  const { showError } = useErrorDialog()

  // Função para buscar solicitantes da API ou mock
  const fetchSolicitantes = async () => {
    try {
      setIsLoadingSolicitantes(true)

      if (USE_MOCK_DATA) {
        console.log("🎭 Usando dados mock para solicitantes")
        await mockDelay()
        setSolicitantes(MOCK_SOLICITANTES)
        return
      }

      const response = await fetch(API_ENDPOINTS.solicitantes)

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()
      console.log("🌐 Dados carregados da API:", data)
      setSolicitantes(data)
    } catch (error) {
      console.error("❌ Erro ao buscar solicitantes:", error)
      showError(
        "Erro ao Carregar Solicitantes",
        "Não foi possível carregar a lista de solicitantes. Verifique sua conexão.",
      )
    } finally {
      setIsLoadingSolicitantes(false)
    }
  }

  // Carregar solicitantes quando o componente montar
  useEffect(() => {
    fetchSolicitantes()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (USE_MOCK_DATA) {
        console.log("🎭 Simulando cadastro de solicitante:", { nome, email })
        await mockDelay()

        toast({
          title: "Solicitante cadastrado com sucesso!",
          description: `${nome} foi cadastrado no sistema (modo demonstração).`,
        })
      } else {
        const response = await fetch(API_ENDPOINTS.solicitantes, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email }),
        })

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`)
        }

        toast({
          title: "Solicitante cadastrado com sucesso!",
          description: `${nome} foi cadastrado no sistema.`,
        })
      }

      setNome("")
      setEmail("")
      fetchSolicitantes()
    } catch (error) {
      console.error("❌ Erro ao cadastrar solicitante:", error)
      showError(
        "Erro ao Cadastrar Solicitante",
        "Não foi possível cadastrar o solicitante. Verifique os dados informados.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR")
  }

  return (
    <div className="min-h-screen bg-system-background">
      {/* Navegação Responsiva */}
      <Navigation />

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário de Cadastro */}
          <Card className="border-system-secondary bg-system-surface">
            <CardHeader>
              <CardTitle className="flex items-center text-system-dark">
                <Plus className="w-5 h-5 mr-2" />
                Novo Solicitante
              </CardTitle>
              <CardDescription className="text-system-primary">
                Preencha os dados da pessoa que poderá fazer reservas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-system-dark">
                    Nome Completo
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Ex: João Silva"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    className="border-system-secondary focus:border-system-primary focus:ring-system-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-system-dark">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ex: joao@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-system-secondary focus:border-system-primary focus:ring-system-primary"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-system-primary hover:bg-system-primary/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    "Cadastrar Solicitante"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lista de Solicitantes */}
          <Card className="border-system-secondary bg-system-surface">
            <CardHeader>
              <CardTitle className="flex items-center text-system-dark">
                <Users className="w-5 h-5 mr-2" />
                Solicitantes Cadastrados
              </CardTitle>
              <CardDescription className="text-system-primary">
                Lista de pessoas autorizadas a fazer reservas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSolicitantes ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-system-primary" />
                  <span className="ml-2 text-system-primary">Carregando solicitantes...</span>
                </div>
              ) : solicitantes.length === 0 ? (
                <div className="text-center py-8 text-system-primary">
                  <Users className="w-12 h-12 mx-auto mb-4 text-system-secondary" />
                  <p>Nenhum solicitante cadastrado ainda.</p>
                  <p className="text-sm text-system-secondary mt-1">
                    Cadastre o primeiro solicitante usando o formulário ao lado.
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-system-secondary">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-system-secondary/50">
                        <TableHead className="text-system-dark font-semibold">Nome</TableHead>
                        <TableHead className="text-system-dark font-semibold">E-mail</TableHead>
                        <TableHead className="text-system-dark font-semibold">Data de Cadastro</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {solicitantes.map((solicitante) => (
                        <TableRow key={solicitante.id} className="hover:bg-system-background">
                          <TableCell className="font-medium text-system-dark">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2 text-system-primary" />
                              {solicitante.nome}
                            </div>
                          </TableCell>
                          <TableCell className="text-system-primary">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-system-secondary" />
                              {solicitante.email}
                            </div>
                          </TableCell>
                          <TableCell className="text-system-secondary">
                            {solicitante.dataCadastro ? formatarData(solicitante.dataCadastro) : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
