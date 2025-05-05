Desafio .Net
# Descrição

-Este repositório contém o projeto desenvolvido como parte de um desafio técnico. O objetivo é criar uma aplicação para gerenciamento de leads, composta por um backend em .NET Core e um frontend em React com TypeScript.
-A aplicação permite visualizar e gerenciar leads em diferentes estados: "Invited" e "Accepted". Além disso, ela consome uma API RESTful e utiliza SQL Server como banco de dados.


## Funcionalidades

### Frontend:
-Exibir leads no estado "Invited":
-Aceitar leads (com desconto automático de 10% no preço se for maior que $500).
-Recusar leads.
-Exibir leads no estado "Accepted".
-Integração com a API backend para manipulação dos dados.

###Backend:
-Implementação de uma API RESTful com .NET Core.
-Manipulação de dados utilizando Entity Framework Core.
-Persistência de dados em SQL Server.


## Tecnologias Utilizadas

### Frontend:
-React
-TypeScript
-Axios
-TanStack Query

### Backend:
-.NET Core Web API
-Entity Framework Core
-SQL Server


## Estrutura do Projeto
-O repositório está organizado da seguinte forma:

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


## Pré-requisitos
-Antes de executar o projeto, certifique-se de ter instalado:
--Node.js (versão recomendada: >= 16.x)
--npm ou yarn (gerenciador de pacotes)
--SQL Server (para o backend)
--.NET Core SDK (para rodar a API)

## Instalação
-Clone este repositório:
--git clone https://github.com/thiago-santos-dti/Desafio-.Net.git
-Navegue até a pasta do backend:
--cd Desafio-.Net/LeadsManagementAPI
-Configure o banco de dados SQL Server conforme as instruções do backend.
-Navegue até a pasta do frontend:
--cd ../leads-management-frontend
-Instale as dependências do frontend:
--npm install


## Configuração

### Banco de Dados:
-O projeto está configurado para se conectar a um banco de dados local usando autenticação do Windows. O banco foi criado utilizando o SQL Server Management Studio.
-Certifique-se de que o SQL Server está instalado e funcionando na sua máquina.
-Abra o SQL Server Management Studio e crie um banco de dados chamado LeadsManagement.
-A conexão com o banco de dados está configurada no arquivo appsettings.json do backend:
--"ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=LeadsManagement;Trusted_Connection=True;"
  }
-Se necessário, ajuste os valores para refletir sua configuração local.
-Execute as migrações para configurar as tabelas do banco de dados:
--dotnet ef database update

#### Configuração do Banco de Dados com Dados de Teste:
-Na raiz do projeto, há um arquivo database_setup.sql que pode ser usado para configurar o banco de dados com dados de teste.
-Para executar este script:
--1: Abra o SQL Server Management Studio
--2: Conecte-se ao seu servidor SQL
--3: Clique em "New Query"
--4: Abra o arquivo database_setup.sql
--5: Execute o script clicando em "Execute" ou pressionando F5
-Este script vai:
--Criar o banco de dados LeadsManagement (se não existir)
--Criar a tabela Leads (se não existir)
--Inserir dados de teste tanto para leads convidados quanto para leads aceitos
--Incluir exemplos com valores abaixo e acima de $500 para demonstrar o comportamento de desconto

### Frontend:
-Certifique-se de que a URL da API backend está correta no código. Por padrão, ela está configurada como:
--const API_URL = 'http://localhost:5133/api/leads';
-Se necessário, altere o valor de API_URL nos arquivos de serviço (leadService.ts) para refletir o endereço correto da sua API.

### Backend:
-Configure o banco de dados SQL Server conforme as instruções.
-Certifique-se de que a API está rodando antes de iniciar o frontend.


## Execução

### Backend:
-Navegue até a pasta LeadsManagementAPI:
--cd Desafio-.Net/LeadsManagementAPI
-Execute o backend:
--dotnet run

### Frontend:
-Navegue até a pasta leads-management-frontend:
--cd ../leads-management-frontend
-Inicie o servidor de desenvolvimento do frontend:
--npm start
-Abra o navegador e acesse:
--http://localhost:3000

## Como usar a aplicação
### Guia de interface:
-1: Navegação entre abas:
--A aplicação possui duas abas principais: "Leads Convidados" e "Leads Aceitos"
--Utilize as abas na parte superior para alternar entre elas
-2: Leads Convidados:
-Esta aba mostra todos os leads no status "Invited" que aguardam sua decisão
--Cada lead é apresentado como um card com suas informações principais
--Para cada lead, você pode escolher:
---Aceitar: O lead será movido para "Leads Aceitos"
---Recusar: O lead será removido da lista
-3: Leads Aceitos:
--Esta aba mostra todos os leads que você aceitou
--Os leads aceitos exibem informações adicionais como email e telefone
-4: Indicação de desconto:
--Leads com valor superior a $500 recebem automaticamente um desconto de 10% quando aceitos
--Estes leads são marcados com uma etiqueta "10% OFF" ao lado do valor
-5: Regras de negócio importantes:
--Todos os valores são apresentados em dólares ($)
--Leads com valor acima de $500 recebem desconto automático de 10% quando aceitos
--Ao aceitar um lead, uma notificação é enviada por email (simulada na aplicação)

## Licença
-Este projeto foi desenvolvido como parte de um desafio técnico e não possui uma licença específica.

## Contato
-Email: thiago.santos@dtidigtal.com.br
-GitHub: thiago-santos-dti
