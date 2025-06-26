# My Food App

## Requisitos

- PHP >= 8.1
- Composer
- MySQL ou outro banco de dados suportado
- Node.js e npm (opcional, para frontend)

## Passos para executar a aplicação

1. **Clone o repositório e acesse o diretório:**
   ```bash
   git clone <url-do-repositorio>
   cd my-food-app
   ```

2. **Instale as dependências do PHP:**
   ```bash
   composer install
   ```

3. **Copie o arquivo de ambiente e configure:**
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` e configure as variáveis de conexão com o banco de dados.

4. **Gere a chave da aplicação:**
   ```bash
   php artisan key:generate
   ```

5. **Execute as migrations:**
   ```bash
   php artisan migrate
   ```

6. **(Opcional) Popule o banco com dados de exemplo:**
   ```bash
   php artisan db:seed
   ```

7. **Inicie o servidor de desenvolvimento:**
   ```bash
   php artisan serve
   ```

8. **Acesse a API:**
   - As rotas da API estarão disponíveis em `http://localhost:8000/api/products`

## Comandos úteis

- Rodar testes: `php artisan test`
- Gerar novas migrations: `php artisan make:migration <nome>`
- Criar novo controller: `php artisan make:controller <NomeController>`

## Observações

- Para autenticação, consulte a documentação do Laravel Sanctum ou Passport.
- Para mais informações, acesse a [documentação oficial do Laravel](https://laravel.com/docs).
