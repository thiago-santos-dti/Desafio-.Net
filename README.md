Desafio .Net
Descrição

Este repositório contém o projeto desenvolvido como parte de um desafio técnico. O objetivo é criar uma aplicação para gerenciamento de leads, composta por um backend em .NET Core e um frontend em React com TypeScript.
A aplicação permite visualizar e gerenciar leads em diferentes estados: "Invited" e "Accepted". Além disso, ela consome uma API RESTful e utiliza SQL Server como banco de dados.


Funcionalidades

Frontend:
-Exibir leads no estado "Invited":
-Aceitar leads (com desconto automático de 10% no preço se for maior que $500).
-Recusar leads.
-Exibir leads no estado "Accepted".
-Integração com a API backend para manipulação dos dados.
-Estilização responsiva e design limpo.

Backend:
-Implementação de uma API RESTful com .NET Core.
-Manipulação de dados utilizando Entity Framework Core.
-Persistência de dados em SQL Server.


Tecnologias Utilizadas

Frontend:
-React
-TypeScript
-Axios
-TanStack Query
-SCSS

Backend:
-.NET Core Web API
-Entity Framework Core
-SQL Server


Estrutura do Projeto
O repositório está organizado da seguinte forma:

Desafio-.Net/
├── LeadsManagementAPI/                # Backend em .NET Core
│   ├── Controllers/                   # Controladores da API
│   ├── Data/                          # Configuração do DbContext
│   ├── Migrations/                    # Migrações do banco de dados
│   ├── Models/                        # Modelos de dados
│   ├── Properties/                    # Configurações adicionais
│   ├── appsettings.json               # Configuração da aplicação
│   └── Program.cs                     # Ponto de entrada do backend
├── leads-management-frontend/         # Frontend em React
│   ├── public/                        # Arquivos públicos (HTML, favicon, etc.)
│   ├── src/                           # Código fonte
│   │   ├── components/                # Componentes React
│   │   ├── hooks/                     # Hooks personalizados
│   │   ├── services/                  # Serviços para requisições HTTP
│   │   ├── types/                     # Tipos TypeScript
│   │   ├── App.tsx                    # Componente principal
│   │   ├── index.tsx                  # Ponto de entrada do app
│   │   ├── index.scss                 # Estilos globais
│   └── package.json                   # Configuração do frontend
└── README.md                          # Documentação do projeto


Pré-requisitos
Antes de executar o projeto, certifique-se de ter instalado:
-Node.js (versão recomendada: >= 16.x)
-npm ou yarn (gerenciador de pacotes)
-SQL Server (para o backend)
-.NET Core SDK (para rodar a API)

Instalação
Clone este repositório:
-git clone https://github.com/thiago-santos-dti/Desafio-.Net.git
Navegue até a pasta do backend:
-cd Desafio-.Net/LeadsManagementAPI
Configure o banco de dados SQL Server conforme as instruções do backend.
Navegue até a pasta do frontend:
-cd ../leads-management-frontend
Instale as dependências do frontend:
-npm install


Configuração

Frontend:
-Certifique-se de que a URL da API backend está correta no código. Por padrão, ela está configurada como:
--const API_URL = 'http://localhost:5133/api/leads';
-Se necessário, altere o valor de API_URL nos arquivos de serviço (leadService.ts) para refletir o endereço correto da sua API.

Backend:
-Configure o banco de dados SQL Server conforme as instruções do backend.
-Certifique-se de que a API está rodando antes de iniciar o frontend.


Execução

Backend:
-Navegue até a pasta LeadsManagementAPI:
--cd Desafio-.Net/LeadsManagementAPI
-Execute o backend:
--dotnet run

Frontend:
-Navegue até a pasta leads-management-frontend:
--cd ../leads-management-frontend
-Inicie o servidor de desenvolvimento do frontend:
--npm start
-Abra o navegador e acesse:
--http://localhost:3000


Licença
Este projeto foi desenvolvido como parte de um desafio técnico e não possui uma licença específica.

Contato
-Email: thiago.santos@dtidigtal.com.br
-GitHub: thiago-santos-dti
