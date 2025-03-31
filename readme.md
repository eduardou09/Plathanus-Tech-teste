# Tela de Notícias - Desafio Full Stack

## Descrição do Projeto

Este projeto implementa uma tela de notícias onde é possível cadastrar, pesquisar e visualizar notícias. O usuário pode criar uma nova notícia informando título, texto e autor, além de editar e excluir as já cadastradas.

## Decisões Técnicas

- **Filtro no banco**: Não implementei o filtro diretamente no banco de dados devido ao tamanho reduzido da aplicação e ao baixo volume de dados. A filtragem ocorre no frontend para evitar complexidade desnecessária.
- **Mobile**: Para garantir que o layout seja responsivo em dispositivos móveis, é necessário recarregar a página ou pressionar F5, pois a biblioteca utilizada requer essa configuração específica.
- **Banco de Dados**: Utilizei **PostgreSQL** para armazenar os dados e **Docker** para rodar o banco. O banco foi criado manualmente no Docker, configurando a senha, porta e conectando-o ao **pgAdmin** para gerenciamento.
- **Padrão de Projeto**: 
   - **Backend** → Arquitetura baseada no padrão **MVC**, com algumas camadas adicionais para melhor organização. 
   - **Frontend** → Componentização seguindo o conceito de **Atomic Design**, garantindo reutilização e escalabilidade.  
- **ORM**: Utilizei **Prisma** para modelar e gerenciar o banco de dados, facilitando a criação das tabelas e garantindo um acesso eficiente aos dados.
- **Gerenciamento de Estado**: No frontend, utilizei **Zustand** para gerenciar o estado global da aplicação de forma simples e performática.
- **Formulários**: Para manipulação de formulários, utilizei **React Hook Form** em conjunto com **Zod** para validação, garantindo uma experiência fluida e segura para o usuário.

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone <url_do_repositorio>
   cd <diretorio_do_projeto>
   ```
2. Configure o banco de dados no Docker:
   - Abra o Docker e crie um novo container PostgreSQL.
   - Defina a senha, porta e usuário.
   - Conecte o banco ao **pgAdmin** para gerenciamento.
   - Caso precise configurar manualmente, utilize o seguinte comando:
     ```bash
     docker run --name meu-postgres -e POSTGRES_USER=seu_usuario -e POSTGRES_PASSWORD=sua_senha -e POSTGRES_DB=seu_banco -p 5432:5432 -d postgres
     ```
   - Para verificar se o container está rodando:
     ```bash
     docker ps
     ```
   - Para acessar o banco via terminal:
     ```bash
     docker exec -it meu-postgres psql -U seu_usuario -d seu_banco
     ```
3. Instale as dependências do backend e inicie o servidor:
   ```bash
   cd server
   yarn install
   yarn start
   ```
4. Instale as dependências do frontend e inicie a aplicação:
   ```bash
   cd client
   yarn install
   yarn start
   ```
5. Para suporte mobile, recarregue a página ou pressione F5.

Agora a aplicação estará disponível para uso!


## Conhecimentos Adicionais

- **Docker**: Experiência em configurar e rodar ambientes isolados com Docker, especialmente com containers PostgreSQL.
- **Push Notifications**: Implementação de **Push Notifications** para aumentar o engajamento dos usuários.
- **Next.js**: Experiência com **Next.js** e **TypeScript** para desenvolvimento de aplicações web.
- **Supabase e Firebase**: Trabalhei com **Supabase** e **Firebase** para implementar soluções de backend, autenticação e armazenamento de dados.
