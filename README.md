# Inventário Patrimonial — PM Jataí

Projeto independente do módulo de inventário patrimonial, composto por:

- frontend React/Vite servido por Nginx;
- backend Java/Spring Boot;
- PostgreSQL;
- inicialização completa com Docker Compose.

Este projeto não depende do sistema de origem nem de um módulo de chamados. Usuários, funcionários, departamentos, patrimônios, estações e documentos são mantidos no próprio banco.

## Como iniciar

1. Copie o arquivo de configuração:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Altere no `.env` todas as senhas marcadas com `troque_...`.

3. Inicie a aplicação:

   ```powershell
   docker compose up --build -d
   ```

4. Acesse `http://localhost` (ou a porta definida em `FRONTEND_PORT`).

## Primeiro acesso

As contas iniciais são criadas somente quando ainda não existem:

- administrador: valores de `APP_ADMIN_USERNAME` e `APP_ADMIN_PASSWORD`;
- operador: valores de `APP_OPERATOR_USERNAME` e `APP_OPERATOR_PASSWORD`.

O administrador gerencia a estrutura, funcionários, departamentos e configurações. O operador executa o fluxo patrimonial permitido pelo perfil.

## Backup e restauração

```powershell
./ops/backup/postgres-backup.ps1
./ops/backup/postgres-restore.ps1 -BackupFile .\backups\asset_guardian_YYYY-MM-DD_HH-mm-ss.dump
```

## Validação

```powershell
npm install
npm run build
cd backend
mvn test
```
