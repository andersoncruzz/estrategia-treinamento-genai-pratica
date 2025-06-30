"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, UserPlus, Menu, X, Users, LogOut, Phone, Mail, Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import type { ReactNode } from "react"

const customStyles = `
  :root {
    --animation-duration: 1.5s; /* Default value */
  }
  
  @keyframes swipeOutLeft {
    0% { 
      transform: translateX(0); 
      opacity: 1; 
    }
    70% { 
      transform: translateX(-400px); 
      opacity: 0.3; 
    }
    100% { 
      transform: translateX(-600px); 
      opacity: 0; 
      height: 0;
      padding: 0;
      margin: 0;
    }
  }
  
  .animate-swipe-out-left {
    animation: swipeOutLeft var(--animation-duration) ease-in-out forwards;
  }
  
  .removing-card {
    background: linear-gradient(90deg, rgb(55 65 81), rgb(239 68 68 / 0.1), rgb(55 65 81));
    border: 1px solid rgb(239 68 68 / 0.3);
  }

  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }

  @keyframes clearSweep {
    0% {
      background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%);
      background-size: 0% 100%;
      background-position: left;
    }
    50% {
      background-size: 100% 100%;
      background-position: left;
    }
    100% {
      background-size: 100% 100%;
      background-position: right;
    }
  }

  @keyframes fieldClear {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.02);
      opacity: 0.7;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes buttonClearPulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
  }

  .clearing-field {
    animation: fieldClear 0.4s ease-in-out;
  }

  .clearing-sweep {
    animation: clearSweep 0.6s ease-in-out;
  }

  .clearing-button {
    animation: buttonClearPulse 0.3s ease-in-out;
  }
`

interface Contato {
  id: number
  nome: string
  telefone: string
  email: string
  observacao: string
}

interface LayoutWithMenuProps {
  children: ReactNode
}

export default function Component() {
  const [activeMenu, setActiveMenu] = useState("consulta")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [contatoEditando, setContatoEditando] = useState<Contato | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextMenu, setNextMenu] = useState<string | null>(null)

  const menuItems = [
    {
      id: "consulta",
      label: "Consulta",
      icon: Search,
    },
    {
      id: "cadastro",
      label: "Cadastro",
      icon: UserPlus,
    },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMenuTransition = (newMenu: string, contato?: Contato | null) => {
    if (newMenu === activeMenu) return

    setIsTransitioning(true)
    setNextMenu(newMenu)

    // Configurar contato editando se fornecido
    if (contato !== undefined) {
      setTimeout(() => {
        setContatoEditando(contato)
      }, 150) // Meio da transição
    }

    // Completar transição após animação
    setTimeout(() => {
      setActiveMenu(newMenu)
      setIsTransitioning(false)
      setNextMenu(null)
    }, 300)
  }

  const handleEditarContato = (contato: Contato) => {
    handleMenuTransition("cadastro", contato)
  }

  const handleNovoContato = () => {
    handleMenuTransition("cadastro", null)
  }

  const handleVoltarConsulta = () => {
    handleMenuTransition("consulta", null)
  }

  const renderContent = () => {
    const currentContent = (() => {
      switch (activeMenu) {
        case "consulta":
          return <ConsultaContent onEditarContato={handleEditarContato} />
        case "cadastro":
          return (
            <CadastroContent
              contatoEditando={contatoEditando}
              onVoltarConsulta={handleVoltarConsulta}
              onNovoContato={handleNovoContato}
            />
          )
        default:
          return <ConsultaContent onEditarContato={handleEditarContato} />
      }
    })()

    return (
      <div className="relative w-full h-full">
        {/* Conteúdo atual */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isTransitioning
              ? "opacity-0 transform translate-x-[-20px] scale-95"
              : "opacity-100 transform translate-x-0 scale-100"
          }`}
        >
          {currentContent}
        </div>

        {/* Overlay de transição */}
        {isTransitioning && (
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-all duration-300 ease-in-out" />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      {/* Menu Lateral Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col h-full bg-gray-800 border-r border-gray-700">
          {/* Header do Menu */}
          <div className="flex items-center justify-center p-6 border-b border-gray-700">
            <Users className="h-8 w-8 text-blue-400 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-white">Agenda</h1>
              <p className="text-xs text-gray-400">de Contatos</p>
            </div>
          </div>

          {/* Itens do Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeMenu === item.id || nextMenu === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        if (item.id === "cadastro") {
                          handleNovoContato()
                        } else {
                          handleMenuTransition(item.id)
                        }
                      }}
                      disabled={isTransitioning}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-blue-600 text-white transform scale-105"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-102"
                      } ${isTransitioning ? "opacity-70" : ""}`}
                    >
                      <Icon
                        className={`h-5 w-5 mr-3 transition-transform duration-300 ${isActive ? "scale-110" : ""}`}
                      />
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Botão Sair */}
          <div className="p-4 border-t border-gray-700">
            <button className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-300 hover:scale-102">
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header Mobile */}
        <div className="md:hidden bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-400 mr-2" />
              <h1 className="text-lg font-bold text-white">Agenda</h1>
            </div>
            <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-white">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Menu Mobile */}
          {isMobileMenuOpen && (
            <div className="mt-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeMenu === item.id || nextMenu === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === "cadastro") {
                        handleNovoContato()
                      } else {
                        handleMenuTransition(item.id)
                      }
                      setIsMobileMenuOpen(false)
                    }}
                    disabled={isTransitioning}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-300 ${
                      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } ${isTransitioning ? "opacity-70" : ""}`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Área de Conteúdo */}
        <div className="flex-1 p-6 overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  )
}

// Componente de Consulta
function ConsultaContent({ onEditarContato }: { onEditarContato: (contato: any) => void }) {
  const [contatos, setContatos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    buscarContatos()
      .then(setContatos)
      .catch(() => setError("Erro ao carregar contatos"))
      .finally(() => setLoading(false))
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [contatoParaExcluir, setContatoParaExcluir] = useState<Contato | null>(null)
  const [excluindoId, setExcluindoId] = useState<number | null>(null)
  const [contatosRemovidos, setContatosRemovidos] = useState<Set<number>>(new Set())

  // Animação de entrada
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Filtrar contatos baseado na busca
  const contatosFiltrados = contatos.filter(
    (contato) =>
      !contatosRemovidos.has(contato.id) &&
      (contato.nome.toLowerCase().startsWith(searchTerm.toLowerCase())),
  )

  const handleEditClick = (contato: Contato) => {
    setEditandoId(contato.id)

    // Adicionar delay para mostrar a animação antes de navegar
    setTimeout(() => {
      onEditarContato(contato)
      setEditandoId(null)
    }, 300)
  }

  const handleExcluirContato = async (contato: Contato) => {
    setExcluindoId(contato.id)
    try {
      await deletarContato(contato.id)
      setContatoParaExcluir(null)
      setContatosRemovidos((prev) => new Set([...prev, contato.id]))
      setTimeout(() => {
        setContatos((prev) => prev.filter((c) => c.id !== contato.id))
        setContatosRemovidos((prev) => {
          const newSet = new Set(prev)
          newSet.delete(contato.id)
          return newSet
        })
      }, 1500)
    } catch (error) {
      console.error("Erro ao excluir contato:", error)
      alert("Erro ao excluir contato. Tente novamente.")
    } finally {
      setExcluindoId(null)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Deseja realmente deletar este contato?")) {
      try {
        await deletarContato(id)
        setContatos((prev) => prev.filter((c) => c.id !== id))
      } catch {
        alert("Erro ao deletar contato!")
      }
    }
  }

  return (
    <div
      className={`max-w-6xl mx-auto transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
      }`}
    >
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="h-6 w-6 text-blue-400" />
            Consulta de Contatos
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Digite o nome, telefone ou e-mail para buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder:text-gray-400 rounded-lg focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>

          {/* Resultados da Consulta */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Resultados ({contatosFiltrados.length})</h3>
            </div>

            {contatosFiltrados.length > 0 ? (
              <div className="space-y-3">
                {contatosFiltrados.map((contato, index) => (
                  <div
                    key={contato.id}
                    className={`bg-gray-700 rounded-lg p-4 transition-all duration-300 transform relative border border-transparent ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    } ${
                      contatosRemovidos.has(contato.id)
                        ? "animate-swipe-out-left removing-card"
                        : "hover:bg-gray-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-900/50"
                    }`}
                    style={{
                      transitionDelay: contatosRemovidos.has(contato.id) ? "0ms" : `${index * 50}ms`,
                      transitionDuration: contatosRemovidos.has(contato.id) ? "1500ms" : "300ms",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {contato.nome
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{contato.nome}</h4>
                            <p className="text-gray-300 text-sm">{contato.observacao}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-13">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300 text-sm">{contato.telefone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300 text-sm">{contato.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditClick(contato)}
                          disabled={editandoId === contato.id}
                          className={`bg-gray-600 border-gray-500 text-white hover:bg-gray-500 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/50 active:scale-95 transition-all duration-200 hover:animate-pulse group relative overflow-hidden ${
                            editandoId === contato.id
                              ? "animate-pulse scale-110 bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/50"
                              : ""
                          }`}
                          onMouseEnter={(e) => {
                            // Adicionar efeito ripple
                            const button = e.currentTarget
                            const rect = button.getBoundingClientRect()
                            const ripple = document.createElement("span")
                            const size = Math.max(rect.width, rect.height)
                            ripple.style.width = ripple.style.height = size + "px"
                            ripple.style.left = "50%"
                            ripple.style.top = "50%"
                            ripple.style.transform = "translate(-50%, -50%) scale(0)"
                            ripple.style.borderRadius = "50%"
                            ripple.style.background = "rgba(255, 255, 255, 0.3)"
                            ripple.style.position = "absolute"
                            ripple.style.pointerEvents = "none"
                            ripple.style.animation = "ripple 0.6s linear"
                            button.appendChild(ripple)
                            setTimeout(() => ripple.remove(), 600)
                          }}
                        >
                          {editandoId === contato.id ? (
                            <div className="animate-spin">
                              <Edit className="h-4 w-4" />
                            </div>
                          ) : (
                            <Edit className="h-4 w-4 group-hover:animate-bounce transition-transform duration-200 group-hover:scale-110" />
                          )}
                        </Button>
                        <AlertDialog
                          open={contatoParaExcluir?.id === contato.id}
                          onOpenChange={(open) => !open && setContatoParaExcluir(null)}
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setContatoParaExcluir(contato)}
                              className="bg-red-600 border-red-500 text-white hover:bg-red-500 hover:scale-110 hover:shadow-xl hover:shadow-red-500/50 active:scale-95 transition-all duration-200 hover:animate-pulse group relative overflow-hidden"
                              onMouseEnter={(e) => {
                                // Adicionar efeito ripple
                                const button = e.currentTarget
                                const rect = button.getBoundingClientRect()
                                const ripple = document.createElement("span")
                                const size = Math.max(rect.width, rect.height)
                                ripple.style.width = ripple.style.height = size + "px"
                                ripple.style.left = "50%"
                                ripple.style.top = "50%"
                                ripple.style.transform = "translate(-50%, -50%) scale(0)"
                                ripple.style.borderRadius = "50%"
                                ripple.style.background = "rgba(255, 255, 255, 0.3)"
                                ripple.style.position = "absolute"
                                ripple.style.pointerEvents = "none"
                                ripple.style.animation = "ripple 0.6s linear"
                                button.appendChild(ripple)
                                setTimeout(() => ripple.remove(), 600)
                              }}
                            >
                              <Trash2 className="h-4 w-4 group-hover:animate-bounce transition-transform duration-200 group-hover:scale-110" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-800 border-gray-700 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-300">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white flex items-center gap-2">
                                <Trash2 className="h-5 w-5 text-red-400" />
                                Confirmar Exclusão
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-300">
                                Tem certeza que deseja excluir o contato{" "}
                                <strong className="text-white">{contatoParaExcluir?.nome}</strong>?
                                <br />
                                <span className="text-red-400 text-sm mt-2 block">
                                  Esta ação não pode ser desfeita.
                                </span>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-2">
                              <AlertDialogCancel
                                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:scale-105 transition-all duration-200"
                                disabled={excluindoId === contato.id}
                              >
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleExcluirContato(contatoParaExcluir!)}
                                disabled={excluindoId === contato.id}
                                className="bg-red-600 hover:bg-red-700 text-white hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {excluindoId === contato.id ? (
                                  <div className="flex items-center gap-2">
                                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                    Excluindo...
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Trash2 className="h-4 w-4" />
                                    Excluir
                                  </div>
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-700 rounded-lg p-8 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg mb-2">Nenhum contato encontrado</p>
                <p className="text-gray-400 text-sm">
                  {searchTerm
                    ? `Não encontramos resultados para "${searchTerm}"`
                    : "Digite algo no campo de busca para encontrar contatos"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente de Cadastro
function CadastroContent({
  contatoEditando,
  onVoltarConsulta,
  onNovoContato,
}: {
  contatoEditando: Contato | null
  onVoltarConsulta: () => void
  onNovoContato: () => void
}) {
  const [formData, setFormData] = useState({
    nome: contatoEditando?.nome || "",
    telefone: contatoEditando?.telefone || "",
    email: contatoEditando?.email || "",
    observacao: contatoEditando?.observacao || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [clearingField, setClearingField] = useState<string | null>(null)

  // Animação de entrada
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Atualizar formulário quando contato editando mudar
  React.useEffect(() => {
    if (contatoEditando) {
      setFormData({
        nome: contatoEditando.nome,
        telefone: contatoEditando.telefone,
        email: contatoEditando.email,
        observacao: contatoEditando.observacao,
      })
    } else {
      setFormData({
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
    value = value.replace(/\D/g, "");
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    // 9 dígitos: (99) 99999-9999
    if (value.length === 14) {
      value = value.replace(/(\(\d{2}\)) (\d{5})(\d{4})/, "$1 $2-$3");
    }
    // 8 dígitos: (99) 9999-9999
    else if (value.length === 13) {
      value = value.replace(/(\(\d{2}\)) (\d{4})(\d{4})/, "$1 $2-$3");
    }
    return value;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "telefone") {
      setFormData((prev) => ({ ...prev, telefone: maskTelefone(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    if (message) {
      setMessage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      // Preparar dados no formato da API
      const dadosAPI = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        observacao: formData.observacao, // Corrigido: era 'observacoes'
      }

      const isEdicao = !!contatoEditando
      const url = isEdicao
        ? `http://localhost:8080/api/contatos/${contatoEditando.id}`
        : "http://localhost:8080/api/contatos"
      const method = isEdicao ? "PUT" : "POST"

      // Fazer requisição para a API
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAPI),
      })

      if (response.ok) {
        // Sucesso
        //const mensagem = isEdicao ? "Contato atualizado com sucesso!" : "Contato cadastrado com sucesso!"
        //setMessage({ type: "success", text: mensagem })

        // Se for cadastro novo, limpar formulário
        if (!isEdicao) {
          setFormData({
            nome: "",
            telefone: "",
            email: "",
            observacao: "",
          })
        }

        // Voltar para consulta após 2 segundos
        setTimeout(() => {
          onVoltarConsulta()
        }, 0)
      } else {
        // Erro da API
        const errorData = await response.json().catch(() => ({}))
        setMessage({
          type: "error",
          text: errorData.message || `Erro ao ${isEdicao ? "atualizar" : "cadastrar"} contato: ${response.status}`,
        })
      }
    } catch (error) {
      // Erro de rede ou outro erro
      console.error("Erro ao processar contato:", error)
      setMessage({
        type: "error",
        text: "Erro de conexão. Verifique se a API está rodando em http://localhost:8080",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = async () => {
    setIsClearing(true)
    setMessage(null)

    // Array com os campos na ordem que serão limpos
    const fields = ["nome", "telefone", "email", "observacao"]

    // Limpar cada campo com delay para criar efeito cascata
    for (let i = 0; i < fields.length; i++) {
      setClearingField(fields[i])

      // Delay entre cada campo
      await new Promise((resolve) => setTimeout(resolve, 150))

      // Limpar o campo atual
      setFormData((prev) => ({
        ...prev,
        [fields[i]]: "",
      }))
    }

    // Finalizar animação
    setTimeout(() => {
      setClearingField(null)
      setIsClearing(false)
    }, 200)
  }

  const isEdicao = !!contatoEditando

  return (
    <div
      className={`max-w-md mx-auto transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 transform translate-y-0 scale-100" : "opacity-0 transform translate-y-4 scale-95"
      }`}
    >
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <UserPlus className="h-6 w-6 text-blue-400" />
            {isEdicao ? "Editar Contato" : "Cadastro de Contato"}
          </CardTitle>
          {isEdicao && <p className="text-gray-400 text-sm">Editando: {contatoEditando.nome}</p>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm font-medium text-gray-200">
                Nome *
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite o nome completo"
                value={formData.nome}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder:text-gray-400 rounded-lg focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 ${
                  clearingField === "nome" ? "clearing-field" : ""
                } ${isClearing ? "clearing-sweep" : ""}`}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="telefone" className="text-sm font-medium text-gray-200">
                Telefone *
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder:text-gray-400 rounded-lg focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 ${
                  clearingField === "telefone" ? "clearing-field" : ""
                } ${isClearing ? "clearing-sweep" : ""}`}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-200">
                E-mail *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder:text-gray-400 rounded-lg focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 ${
                  clearingField === "email" ? "clearing-field" : ""
                } ${isClearing ? "clearing-sweep" : ""}`}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="observacao" className="text-sm font-medium text-gray-200">
                Observação
              </label>
              <textarea
                id="observacao"
                name="observacao"
                placeholder="Informações adicionais sobre o contato..."
                value={formData.observacao}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder:text-gray-400 rounded-lg focus:border-blue-500 focus:ring-blue-500 min-h-[80px] resize-none transition-all duration-200 ${
                  clearingField === "observacao" ? "clearing-field" : ""
                } ${isClearing ? "clearing-sweep" : ""}`}
                disabled={isLoading}
              />
            </div>

            {/* Mensagem de feedback */}
            {message && (
              <div
                className={`p-3 rounded-lg text-sm transition-all duration-300 animate-in slide-in-from-top-2 ${
                  message.type === "success"
                    ? "bg-green-600/20 border border-green-500 text-green-300"
                    : "bg-red-600/20 border border-red-500 text-red-300"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gray-900 hover:bg-gray-600 text-white border border-gray-400 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                {isLoading
                  ? isEdicao
                    ? "Atualizando..."
                    : "Salvando..."
                  : isEdicao
                    ? "Atualizar Contato"
                    : "Salvar Contato"}
              </Button>
              <Button
                type="button"
                onClick={isEdicao ? onVoltarConsulta : handleClear}
                disabled={isLoading || isClearing}
                className={`flex-1 bg-gray-700 border border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50 transition-all duration-200 hover:scale-105 ${
                  isClearing ? "clearing-button" : ""
                }`}
              >
                {isClearing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Limpando...
                  </div>
                ) : isEdicao ? (
                  "Cancelar"
                ) : (
                  "Limpar"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// Funções utilitárias para integração com a API
export async function buscarContatos(nome?: string) {
  let url = "http://localhost:8080/api/contatos"
  if (nome && nome.trim().length > 0) {
    url = `http://localhost:8080/api/contatos/getByName/${encodeURIComponent(nome)}`
  }
  const response = await fetch(url)
  if (!response.ok) throw new Error("Erro ao buscar contatos")
  return await response.json()
}

export async function buscarContatoPorId(id: number) {
  const response = await fetch(`http://localhost:8080/api/contatos/getById/${id}`)
  if (!response.ok) throw new Error("Erro ao buscar contato por id")
  return await response.json()
}

export async function deletarContato(id: number) {
  const response = await fetch(`http://localhost:8080/api/contatos/${id}`, { method: "DELETE" })
  if (!response.ok) throw new Error("Erro ao deletar contato")
}
