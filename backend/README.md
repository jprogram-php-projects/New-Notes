# ![Logo](public/assets/images/logo.png)

Este é um projeto Laravel chamado **Notes**, onde os usuários podem criar, ler, atualizar e excluir notas (CRUD). O sistema utiliza **PostgreSQL** como banco de dados para armazenar as informações das notas e segue o padrão **RESTful API** para comunicação entre backend e frontend.

## Tecnologias Utilizadas

* [Laravel 11.x](https://laravel.com/) - Framework PHP
* [PostgreSQL](https://www.postgresql.org/) - Banco de Dados Relacional
* [JWT Auth](https://jwt.io/) - Autenticação via JSON Web Token

## Funcionalidades

* **Criar Notas**: Permite que o usuário crie novas notas.
* **Ler Notas**: Exibe uma lista de todas as notas e detalhes específicos de cada nota.
* **Atualizar Notas**: O usuário pode editar o conteúdo de uma nota existente.
* **Excluir Notas**: O usuário pode deletar uma nota.
* **Autenticação JWT**: Login e proteção de rotas via token.
* **API RESTful**: Estrutura de rotas seguindo boas práticas REST.

## Instalação Backend

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/seuusuario/seu-repositorio-backend.git
   cd seu-repositorio-backend
   ```

2. **Instale as dependências do Laravel:**

   ```bash
   composer install
   ```

3. **Crie o arquivo `.env` e configure:**

   ```bash
   cp .env.example .env
   ```

   Configure as credenciais do banco de dados PostgreSQL:

   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=laravel_notes
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   ```

   Gere a chave da aplicação e defina a chave JWT:

   ```bash
   php artisan key:generate
   php artisan jwt:secret
   ```

4. **Execute as migrações e seeders:**

   ```bash
   php artisan migrate --seed
   ```

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   php artisan serve
   ```

   Acesse o sistema no navegador: [http://localhost:8000](http://localhost:8000)

---

## Instalação Frontend

1. **Clone o repositório do frontend:**

   ```bash
   git clone https://github.com/seuusuario/seu-repositorio-frontend.git
   cd seu-repositorio-frontend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure a URL da API no ambiente:**
   Edite o arquivo `src/environments/environment.ts`:

   ```ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8000/api'
   };
   ```

4. **Inicie o servidor Angular:**

   ```bash
   ng serve
   ```

   Acesse [http://localhost:4200](http://localhost:4200)

---

## Observações

* Certifique-se de que o PostgreSQL esteja rodando antes de iniciar o backend.
* O `composer.json`, `composer.lock`, `package.json` e `package-lock.json` devem ser versionados no GitHub.
* Para gerar dados iniciais, utilize os **seeders** com `php artisan migrate --seed`.
* Sempre que clonar o projeto, lembre-se de rodar `php artisan key:generate` e `php artisan jwt:secret` para configurar corretamente as chaves.
