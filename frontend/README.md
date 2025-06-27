# Estratégia Treinamento GenAI Prática - Frontend

Este projeto é uma aplicação frontend desenvolvida com o objetivo de gerenciar informações relacionadas a abastecimento, combustíveis, condutores e postos. A interface é moderna, responsiva e utiliza as melhores práticas do ecossistema React e Next.js.

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web modernas e performáticas.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva.
- **PostCSS**: Ferramenta para transformar CSS com plugins.
- **pnpm**: Gerenciador de pacotes rápido e eficiente.

## Estrutura de Pastas

- `app/` - Páginas e rotas da aplicação.
  - `abastecimento/`, `combustiveis/`, `condutores/`, `postos/` - Rotas principais.
- `components/` - Componentes reutilizáveis (UI e lógicos).
- `hooks/` - Hooks customizados.
- `lib/` - Funções utilitárias.
- `public/` - Arquivos estáticos e imagens.
- `styles/` - Arquivos de estilos globais.

## Rotas Principais

- `/` - Dashboard ou página inicial.
- `/abastecimento` - Gerenciamento de abastecimentos.
- `/combustiveis` - Gerenciamento de combustíveis.
- `/condutores` - Gerenciamento de condutores.
- `/postos` - Gerenciamento de postos.

## Componentes de Destaque

- `app-sidebar` - Barra lateral de navegação.
- `fuel-map` - Mapa de postos/abastecimentos.
- `theme-provider` - Gerenciamento de tema (claro/escuro).
- Componentes UI em `components/ui/` - Botões, tabelas, formulários, etc.

## Dependências Principais

- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `@headlessui/react` (opcional, para componentes acessíveis)
- `@heroicons/react` (ícones SVG para React)
- `clsx` (utilitário para manipulação de classes CSS)
- `lucide-react` (biblioteca de ícones)
- `zod` (validação de schemas)
- `react-hook-form` (gerenciamento de formulários)
- `@tanstack/react-table` (tabelas avançadas)
- `@tanstack/react-query` (gerenciamento de dados assíncronos)
- Outras dependências podem ser consultadas no `package.json`.

## Instruções de Instalação e Execução

1. **Clone o repositório:**
   ```sh
   git clone <url-do-repositorio>
   cd frontend
   ```
2. **Instale as dependências:**
   ```sh
   yarn install
   ```
3. **Execute o projeto em modo desenvolvimento:**
   ```sh
   yarn dev
   ```
   O projeto estará disponível em `http://localhost:3000`.

4. **Build para produção:**
   ```sh
   yarn build
   yarn start
   ```


## Observações

- Certifique-se de ter o Node.js e o pnpm instalados.
- Para customizações de tema, edite o arquivo `tailwind.config.ts`.
- Para adicionar novos componentes, utilize a pasta `components/`.

---

Desenvolvido para fins de treinamento e demonstração de práticas modernas de desenvolvimento frontend.
