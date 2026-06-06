# Documentação do Sistema de Login

O sistema de autenticação e login foi desenvolvido em uma arquitetura cliente-servidor, utilizando React no frontend e Node.js/Express no backend. O sistema adota padrões modernos de segurança, como JWT com Refresh Tokens em cookies `HttpOnly`, criptografia avançada para senhas e proteção contra força bruta.

## 1. Frontend (`frontend/src/pages/Login.tsx`)
A interface de login é construída como um componente React que gerencia múltiplos fluxos (estados) em uma única tela (SPA), garantindo agilidade e UX fluida.
o logo esta na pasta: frontend/public/logo.jpeg

### Estados Principais (Fluxos):
- **`login`**: Tela padrão de acesso (usuário e senha).
- **`forgot`**: Solicitação de código para recuperação de senha via e-mail.
- **`reset`**: Inserção do código de 6 dígitos recebido e da nova senha.
- **`force_reset`**: Tela obrigatória ativada quando o administrador exige a troca de senha no próximo login.

### Funcionalidades:
- Formulário gerencia submissões via chamadas `fetch` à API (`/api/auth/*`).
- Interface responsiva com `TailwindCSS` e ícones `lucide-react`.
- Tratamento explícito de estados de carregamento (loading), mensagens de erro e sucesso.

## 2. Backend (`backend/src/...`)
O backend gerencia toda a lógica de autenticação dividida em rotas, controladores e serviços, incluindo validação de dados com `Zod`.

### Rotas e Controladores (`auth.routes.ts`, `auth.controller.ts`)
- `POST /api/auth/login`: Autenticação local do operador do sistema.
- `POST /api/auth/refresh`: Atualização (rotation) do access token utilizando o refresh token contido no cookie.
- `POST /api/auth/logout`: Invalidação e limpeza do cookie de refresh token.
- Rotas de senha (`/forgot-password`, `/reset-password`) para recuperação segura de credenciais.

### Regras de Negócio (`auth.routes.ts`)
- **Login Local**: Autenticação realizada estritamente informando o Nome de Usuário (formato `nome.sobrenome`) e a senha de segurança. O e-mail associado ao operador é cadastrado de forma individual no sistema, sem a exigência de um domínio único corporativo obrigatório.
- **Validação de Senha**: Utiliza o algoritmo `argon2` para checar e salvar hashes de senha.
- **Troca Obrigatória**: Se a flag `change_password_next_login` estiver ativa, o sistema retorna `mustChangePassword: true` no login, bloqueando o acesso até a alteração da senha.

## 3. Segurança e Tokens
O sistema aplica a estratégia de *Short-lived Access Token* + *Long-lived Refresh Token*.

- **Access Token (JWT)**: Assinado e devolvido no corpo da resposta JSON. Expira em 15 minutos. Contém o ID do usuário e a Role.
- **Refresh Token (Opaque Token)**: Uma string aleatória forte (40 bytes em hex) gerada no backend, com duração de 7 dias.
  - **Armazenamento Seguro**: É entregue via Cookie `HttpOnly`, `Secure` (em produção), e `SameSite=Lax`. O JavaScript do frontend não tem acesso a ele.
  - **Rotação de Token**: Ao atualizar, um novo conjunto de tokens é gerado e o antigo é revogado no banco.
  - **Hashing no Banco**: O Refresh Token é salvo em formato hash SHA-256 no banco de dados (`token_hash`), garantindo segurança caso o DB seja vazado. Se um token revogado for utilizado, toda a cadeia do usuário é invalidada.

## 4. Fluxo de Recuperação de Senha
1. O usuário informa o e-mail no frontend.
2. O backend gera um código numérico de 6 dígitos válido por 15 minutos.
3. O código é salvo no banco (`reset_token`) junto com o prazo de validade (`reset_token_expires`).
4. O e-mail é disparado utilizando o `Nodemailer` e configurações SMTP.
5. O usuário digita o código e a nova senha no frontend, e o backend valida o token, aplica o hash na nova senha e limpa as colunas de token de recuperação no banco de dados.
