// contact-api.ts
// Cliente para cadastrar novo contato via POST e listar contatos via GET

export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  notes?: string;
}

export async function createContact(contact: ContactPayload) {
  const response = await fetch('http://localhost:8080/api/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar contato');
  }

  return response.json();
}

export async function getContacts() {
  const response = await fetch('http://localhost:8080/api/contacts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // O Next.js pode rodar no server ou client, então não use cache para garantir dados atualizados
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar contatos');
  }

  return response.json();
}

export async function deleteContact(id: number) {
  const response = await fetch(`http://localhost:8080/api/contacts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar contato');
  }
}
