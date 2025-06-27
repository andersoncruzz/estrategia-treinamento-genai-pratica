// contact-api-client.ts

export interface ContatoPayload {
  nome: string;
  telefone: string;
  email: string;
  observacao?: string;
}

export async function cadastrarContato(payload: ContatoPayload): Promise<Response> {
  return fetch("http://localhost:8080/api/contatos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

export async function deletarContato(id: number) {
  const response = await fetch(`http://localhost:8080/api/contatos/${id}`, { method: "DELETE" })
  if (!response.ok) throw new Error("Erro ao deletar contato")
}
