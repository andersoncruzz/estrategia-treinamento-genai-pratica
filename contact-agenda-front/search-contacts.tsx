"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, User, Phone, Mail, Edit, Trash2 } from "lucide-react"

// Dados mock para demonstração
const mockContacts = [
  { id: 1, name: "Ana Silva", phone: "(11) 99999-1111", email: "ana@email.com", notes: "Colega de trabalho" },
  { id: 2, name: "Bruno Santos", phone: "(11) 99999-2222", email: "bruno@email.com", notes: "Cliente importante" },
  { id: 3, name: "Carlos Oliveira", phone: "(11) 99999-3333", email: "carlos@email.com", notes: "" },
  { id: 4, name: "Diana Costa", phone: "(11) 99999-4444", email: "diana@email.com", notes: "Amiga da faculdade" },
  { id: 5, name: "Eduardo Lima", phone: "(11) 99999-5555", email: "eduardo@email.com", notes: "Fornecedor" },
]

export default function SearchContacts() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-gray-50 p-4 min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Search className="h-6 w-6" />
              Pesquisar Contatos
            </CardTitle>
            <CardDescription>Digite o nome do contato que você está procurando</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="search">Nome do contato</Label>
              <Input
                id="search"
                placeholder="Digite o nome para pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {searchTerm ? `Resultados para "${searchTerm}"` : "Digite um nome para pesquisar"}
            </h2>
            <span className="text-sm text-gray-500">{filteredContacts.length} contato(s) encontrado(s)</span>
          </div>

          {searchTerm && filteredContacts.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Nenhum contato encontrado com esse nome</p>
              </CardContent>
            </Card>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {contact.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {contact.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {contact.email}
                      </p>
                      {contact.notes && <p className="text-gray-500 mt-2">{contact.notes}</p>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
