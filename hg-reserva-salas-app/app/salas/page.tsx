"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Building, Loader2, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useErrorDialog } from "@/contexts/error-dialog-context"
import { API_ENDPOINTS, USE_MOCK_DATA } from "@/lib/api"
import { MOCK_SALAS, mockDelay, type Sala } from "@/lib/mock-data"
import { Navigation } from "@/components/navigation"

export default function SalasPage() {
  const [nome, setNome] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [salas, setSalas] = useState<Sala[]>([])
  const [isLoadingSalas, setIsLoadingSalas] = useState(true)
  const { toast } = useToast()
  const { showError } = useErrorDialog()

  // Função para buscar salas da API ou mock
  const fetchSalas = async () => {
    try {
      setIsLoadingSalas(true)

      if (USE_MOCK_DATA) {
        console.log("🎭 Usando dados mock para salas")
        await mockDelay()
        setSalas(MOCK_SALAS)
        return
      }

      const response = await fetch(API_ENDPOINTS.salas)

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()
      console.log("🌐 Dados carregados da API:", data)
      setSalas(data)
    } catch (error) {
      console.error("❌ Erro ao buscar salas:", error)
      showError("Erro ao Carregar Salas", "Não foi possível carregar a lista de salas. Verifique sua conexão.")
    } finally {
      setIsLoadingSalas(false)
    }
  }

  // Carregar salas quando o componente montar
  useEffect(() => {
    fetchSalas()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (USE_MOCK_DATA) {
        console.log("🎭 Simulando cadastro de sala:", nome)
        await mockDelay()

        toast({
          title: "Sala cadastrada com sucesso!",
          description: `A sala "${nome}" foi cadastrada (modo demonstração).`,
        })
      } else {
        const response = await fetch(API_ENDPOINTS.salas, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome }),
        })

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`)
        }

        toast({
          title: "Sala cadastrada com sucesso!",
          description: `A sala "${nome}" foi cadastrada.`,
        })
      }

      setNome("")
      fetchSalas()
    } catch (error) {
      console.error("❌ Erro ao cadastrar sala:", error)
      showError("Erro ao Cadastrar Sala", "Não foi possível cadastrar a sala. Verifique os dados informados.")
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
                Nova Sala
              </CardTitle>
              <CardDescription className="text-system-primary">
                Preencha os dados da sala que deseja cadastrar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-system-dark">
                    Nome da Sala
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Ex: Sala de Reunião A"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
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
                    "Cadastrar Sala"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lista de Salas */}
          <Card className="border-system-secondary bg-system-surface">
            <CardHeader>
              <CardTitle className="flex items-center text-system-dark">
                <Building className="w-5 h-5 mr-2" />
                Salas Cadastradas
              </CardTitle>
              <CardDescription className="text-system-primary">Lista de salas disponíveis para reserva</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSalas ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-system-primary" />
                  <span className="ml-2 text-system-primary">Carregando salas...</span>
                </div>
              ) : salas.length === 0 ? (
                <div className="text-center py-8 text-system-primary">
                  <Building className="w-12 h-12 mx-auto mb-4 text-system-secondary" />
                  <p>Nenhuma sala cadastrada ainda.</p>
                  <p className="text-sm text-system-secondary mt-1">
                    Cadastre a primeira sala usando o formulário ao lado.
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-system-secondary">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-system-secondary/50">
                        <TableHead className="text-system-dark font-semibold">Nome da Sala</TableHead>
                        <TableHead className="text-system-dark font-semibold">Data de Cadastro</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salas.map((sala) => (
                        <TableRow key={sala.id} className="hover:bg-system-background">
                          <TableCell className="font-medium text-system-dark">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-system-primary" />
                              {sala.nome}
                            </div>
                          </TableCell>
                          <TableCell className="text-system-secondary">
                            {sala.dataCadastro ? formatarData(sala.dataCadastro) : "-"}
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
