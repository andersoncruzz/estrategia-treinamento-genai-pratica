import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Phone, Mail, FileText } from "lucide-react"

export default function Component() {
  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Novo Contato</CardTitle>
          <CardDescription>Adicione um novo contato à sua agenda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nome
            </Label>
            <Input id="name" name="name" placeholder="Digite o nome completo" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Telefone
            </Label>
            <Input id="phone" name="phone" type="tel" placeholder="(11) 99999-9999" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              E-mail
            </Label>
            <Input id="email" name="email" type="email" placeholder="exemplo@email.com" required />
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
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Salvar Contato
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
