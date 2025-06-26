# Sistema de Agendamento de Serviços

Este projeto é um backend em Python/Django para agendamento de serviços, onde:
- O administrador pode restringir dias e horários disponíveis.
- O usuário pode adicionar um ou vários dias para agendamento, definindo hora inicial e final para cada período.
- O banco de dados utilizado é PostgreSQL.

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
2. Configure o banco de dados PostgreSQL no arquivo `agendamento/settings.py`.
3. Execute as migrações:
   ```bash
   python manage.py migrate
   ```
4. Inicie o servidor:
   ```bash
   python manage.py runserver
   ```

## Estrutura inicial
- Django
- PostgreSQL

## Customizações futuras
- Modelos para usuários, administradores, restrições de agenda e agendamentos.
- APIs para gerenciamento de horários e agendamentos.
