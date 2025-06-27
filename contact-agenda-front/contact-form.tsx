"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Phone, Mail, FileText } from "lucide-react"
import { useState } from "react"
import { createContact } from "./contact-api"
import { useRouter } from "next/navigation"

export default function Component() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      await createContact({ name, phone, email, notes })
      setSuccess("Contato cadastrado com sucesso!")
      setName("")
      setPhone("")
      setEmail("")
      setNotes("")
      setTimeout(() => {
        router.push("/contacts")
      }, 1000)
    } catch (err) {
      setError("Erro ao cadastrar contato.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Novo Contato</CardTitle>
          <CardDescription>Adicione um novo contato à sua agenda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome
              </Label>
              <Input id="name" name="name" placeholder="Digite o nome completo" required value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Telefone
              </Label>
              <Input id="phone" name="phone" type="tel" placeholder="(11) 99999-9999" required value={phone} onChange={e => setPhone(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                E-mail
              </Label>
              <Input id="email" name="email" type="email" placeholder="exemplo@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Observações
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Adicione observações sobre o contato (opcional)"
                className="min-h-[80px] resize-none"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" type="button" disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Contato"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
