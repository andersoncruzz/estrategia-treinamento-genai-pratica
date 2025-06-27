import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Bem-vindo à Agenda de Contatos</CardTitle>
          <CardDescription>
            Uma aplicação para gerenciar seus contatos de forma simples, rápida e eficiente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-lg text-gray-700">
          <p>
            Este sistema permite cadastrar, editar, remover e pesquisar contatos, facilitando o acesso e a organização das suas informações pessoais ou profissionais.
          </p>
          <ul className="list-disc pl-6 text-base">
            <li>Adicione novos contatos com nome, telefone, e-mail e observações.</li>
            <li>Edite ou remova contatos existentes facilmente.</li>
            <li>Pesquise rapidamente por nome, telefone ou e-mail.</li>
            <li>Interface moderna, responsiva e fácil de usar.</li>
          </ul>
          <p>
            Explore o menu para começar a usar a aplicação!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
