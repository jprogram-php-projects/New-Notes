
# ![Logo](public/assets/images/logo.png)

Este é um projeto Laravel chamado **Notes**, onde os usuários podem criar, ler, atualizar e excluir notas (CRUD). O sistema utiliza o MySQL como banco de dados para armazenar as informações das notas.

## Tecnologias Utilizadas

- [Laravel](https://laravel.com/) - Framework PHP
- [MySQL](https://www.mysql.com/) - Banco de Dados Relacional

## Funcionalidades

- **Criar Notas**: Permite que o usuário crie novas notas.
- **Ler Notas**: Exibe uma lista de todas as notas e detalhes específicos de cada nota.
- **Atualizar Notas**: O usuário pode editar o conteúdo de uma nota existente.
- **Excluir Notas**: O usuário pode deletar uma nota.

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/jprogram-php-projects/notes.git
   cd notes

2. Instale as dependências do projeto:

    ```bash
    composer install

3. Configure o arquivo .env:

    Duplique o arquivo .env.example para criar um arquivo .env.
   
    Configure as informações do banco de dados MySQL:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel_notes
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha

4. Execute as migrações do banco de dados:

    ```bash
    php artisan migrate

5. Uso
    Para iniciar o servidor de desenvolvimento, execute:
    ```bash
    php artisan serve
Acesse o sistema no navegador em http://localhost:8000.
