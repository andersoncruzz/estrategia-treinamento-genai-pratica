"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, User, Phone, Mail, Edit, Trash2, Plus, Search } from "lucide-react"

// Dados mock expandidos para demonstração
const mockContacts = [
  { id: 1, name: "Ana Silva", phone: "(11) 99999-1111", email: "ana@email.com", notes: "Colega de trabalho" },
  { id: 2, name: "Bruno Santos", phone: "(11) 99999-2222", email: "bruno@email.com", notes: "Cliente importante" },
  { id: 3, name: "Carlos Oliveira", phone: "(11) 99999-3333", email: "carlos@email.com", notes: "" },
  { id: 4, name: "Diana Costa", phone: "(11) 99999-4444", email: "diana@email.com", notes: "Amiga da faculdade" },
  { id: 5, name: "Eduardo Lima", phone: "(11) 99999-5555", email: "eduardo@email.com", notes: "Fornecedor" },
  { id: 6, name: "Fernanda Rocha", phone: "(11) 99999-6666", email: "fernanda@email.com", notes: "Vizinha" },
  { id: 7, name: "Gabriel Mendes", phone: "(11) 99999-7777", email: "gabriel@email.com", notes: "Professor" },
  { id: 8, name: "Helena Barbosa", phone: "(11) 99999-8888", email: "helena@email.com", notes: "Médica" },
]

export default function AllContacts() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm),
  )

  return (
    <div className="bg-gray-50 p-4 min-h-[calc(100vh-4rem)]">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Todos os Contatos
                </CardTitle>
                <CardDescription>Gerencie todos os seus contatos em um só lugar</CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Contato
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                {filteredContacts.length} contatos
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  </div>

                  {contact.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500 line-clamp-2">{contact.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && searchTerm && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum contato encontrado</h3>
              <p className="text-gray-500 mb-4">
                Não encontramos contatos que correspondam à sua pesquisa "{searchTerm}"
              </p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Limpar pesquisa
              </Button>
            </CardContent>
          </Card>
        )}

        {filteredContacts.length === 0 && !searchTerm && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum contato cadastrado</h3>
              <p className="text-gray-500 mb-4">Comece adicionando seu primeiro contato à agenda</p>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Primeiro Contato
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
