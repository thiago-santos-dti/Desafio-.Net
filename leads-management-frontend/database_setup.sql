-- Script para configurar e popular o banco de dados para testes

-- Verifica se o banco de dados já existe; caso contrário, cria-o
IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'LeadsManagement')
BEGIN
  CREATE DATABASE LeadsManagement;
END
GO

USE LeadsManagement;
GO

-- Verifica se a tabela Leads já existe; caso contrário, cria-a
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Leads]') AND type in (N'U'))
BEGIN
  CREATE TABLE [dbo].[Leads] (
      [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
      [FirstName] NVARCHAR(100) NOT NULL,
      [LastName] NVARCHAR(100) NOT NULL,
      [PhoneNumber] NVARCHAR(20) NULL,
      [Email] NVARCHAR(150) NULL,
      [DateCreated] DATETIME NOT NULL,
      [Suburb] NVARCHAR(100) NOT NULL,
      [Category] NVARCHAR(100) NOT NULL,
      [Description] NVARCHAR(500) NOT NULL,
      [Price] DECIMAL(18, 2) NOT NULL,
      [Status] NVARCHAR(50) NOT NULL
  );
END
GO

-- Limpa os dados existentes para evitar duplicação durante testes
DELETE FROM [dbo].[Leads];
GO

-- Redefine o contador de identidade
DBCC CHECKIDENT ('[dbo].[Leads]', RESEED, 0);
GO

-- Insere dados de exemplo - Leads Convidados (Status = 'Invited')
INSERT INTO [dbo].[Leads] (FirstName, LastName, PhoneNumber, Email, DateCreated, Suburb, Category, Description, Price, Status)
VALUES 
-- Leads com preços ABAIXO de $500 (sem desconto automático quando aceitados)
('Jane', 'Smith', '9876543210', 'jane.smith@example.com', GETDATE(), 'Melbourne', 'Automotive', 'Looking for a new car financing option with low interest rates.', 350.00, 'Invited'),
('Mike', 'Johnson', '5551234567', 'mike.johnson@example.com', DATEADD(DAY, -2, GETDATE()), 'Sydney', 'Education', 'Need mathematics tutoring for high school student.', 250.00, 'Invited'),
('Emily', 'Brown', '7778889999', 'emily.brown@example.com', DATEADD(DAY, -1, GETDATE()), 'Brisbane', 'Home Services', 'Looking for house cleaning service, weekly basis.', 120.00, 'Invited'),

-- Leads com preços ACIMA de $500 (receberão desconto automático de 10% quando aceitados)
('David', 'Wilson', '1112223333', 'david.wilson@example.com', GETDATE(), 'Adelaide', 'Technology', 'Need a complete website overhaul for small business.', 1200.00, 'Invited'),
('Sarah', 'Taylor', '4445556666', 'sarah.taylor@example.com', DATEADD(DAY, -3, GETDATE()), 'Perth', 'Home Repair', 'Complete kitchen renovation project.', 8500.00, 'Invited'),
('Thomas', 'Anderson', '8889990000', 'thomas.anderson@example.com', DATEADD(DAY, -2, GETDATE()), 'Canberra', 'Professional Services', 'Looking for accounting services for small business.', 750.00, 'Invited');
GO

-- Insere dados de exemplo - Leads Aceitos (Status = 'Accepted')
-- Já incluindo o desconto de 10% para leads com preços acima de $500
INSERT INTO [dbo].[Leads] (FirstName, LastName, PhoneNumber, Email, DateCreated, Suburb, Category, Description, Price, Status)
VALUES 
-- Leads com preços ABAIXO de $500 (sem desconto)
('John', 'Doe', '1234567890', 'john.doe@example.com', DATEADD(DAY, -5, GETDATE()), 'Melbourne', 'Health', 'Need a personal trainer twice a week.', 350.00, 'Accepted'),
('Lisa', 'Parker', '3334445555', 'lisa.parker@example.com', DATEADD(DAY, -7, GETDATE()), 'Brisbane', 'Beauty', 'Looking for regular hair styling service.', 180.00, 'Accepted'),

-- Leads com preços ACIMA de $500 (com desconto de 10% já aplicado)
('Robert', 'Martin', '6667778888', 'robert.martin@example.com', DATEADD(DAY, -10, GETDATE()), 'Sydney', 'Construction', 'House extension project, need quotation.', 9000.00 * 0.9, 'Accepted'),
('Amanda', 'Lewis', '2223334444', 'amanda.lewis@example.com', DATEADD(DAY, -8, GETDATE()), 'Gold Coast', 'Events', 'Wedding planner needed for 150 guest event.', 2000.00 * 0.9, 'Accepted');
GO

-- Visualiza os dados inseridos
SELECT * FROM [dbo].[Leads] ORDER BY DateCreated DESC;
GO

-- Contagem de leads por status
SELECT Status, COUNT(*) AS TotalLeads FROM [dbo].[Leads] GROUP BY Status;
GO

-- Verificação de leads com valor acima de $500 (que receberiam desconto)
SELECT Id, FirstName, LastName, Price, Status 
FROM [dbo].[Leads] 
WHERE Price > 500 OR (Status = 'Accepted' AND Price > 450) -- Considera os que já receberam desconto
ORDER BY Price DESC;
GO

PRINT 'Configuração do banco de dados concluída com sucesso!';
PRINT 'Foram inseridos leads de teste nos estados "Invited" e "Accepted"';
PRINT 'Leads com preço acima de $500 recebem 10% de desconto quando aceitos';
GO