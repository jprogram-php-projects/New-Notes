# ![Logo](../backend/public/assets/images/logo.png)

Este é um projeto Laravel chamado **Notes**, onde os usuários podem criar, ler, atualizar e excluir notas (CRUD). O sistema utiliza **PostgreSQL** como banco de dados para armazenar as informações das notas e segue o padrão **RESTful API** para comunicação entre backend e frontend.

## Tecnologias Utilizadas

* [Laravel 11.x](https://laravel.com/) - Framework PHP
* [PostgreSQL](https://www.postgresql.org/) - Banco de Dados Relacional
* [JWT Auth](https://jwt.io/) - Autenticação via JSON Web Token
* [Angular 20.1.5](https://angular.dev/) - Framework Frontend

## Funcionalidades

* **Criar Notas**: Permite que o usuário crie novas notas.
* **Ler Notas**: Exibe uma lista de todas as notas e detalhes específicos de cada nota.
* **Atualizar Notas**: O usuário pode editar o conteúdo de uma nota existente.
* **Excluir Notas**: O usuário pode deletar uma nota.
* **Autenticação JWT**: Login e proteção de rotas via token.
* **API RESTful**: Estrutura de rotas seguindo boas práticas REST.

## Instalação Frontend

1. **Acesse o repositório do frontend:**

   ```bash
   cd frontend
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

* O `composer.json`, `composer.lock`, `package.json` e `package-lock.json` devem ser versionados no GitHub.
