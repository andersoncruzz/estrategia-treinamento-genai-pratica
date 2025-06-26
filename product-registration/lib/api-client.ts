// lib/api-client.ts
// Cliente para chamadas à API de cadastro de produto

export interface ProdutoPayload {
  nome: string;
  preco: string;
  descricao: string;
  dataVencimento: string;
}

export async function cadastrarProduto(payload: ProdutoPayload) {
  const response = await fetch("/api/produtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar produto");
  }

  return response.json();
}
