# Recuperação de senha

**Requisitos Funcionais**

- O usuário deve:
  - poder recuperar sua senha informando seu e-mail;
  - receber um e-mail com instruções de recuperação de senha;
  - poder resetar sua senha;

**Requisitos Não Funcionais**

- Usar o Mailtrap para testar o envio de e-mails em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envio de e-mails em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**Regras de negócio**

- O link enviado por e-mail para resetar senha deve expirar em 2h;
- O usuário deve confirmar sua nova senha ao resetar a senha;

# Atualização do perfil

**Requisitos Funcionais**

- O usuário deve poder atualizar seu perfil;

**Requisitos Não Funcionais**

-

**Regras de negócio**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar seu perfil, o usuário deve informar sua senha;

# Painel do barbeiro

**Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O barbeiro deve:
  - receber uma notificação sempre que houver um novo agendamento;
  - poder visualizar as notificações não lidas;

**Requisitos Não Funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador:
  - devem ser armazenadas no MongoDB;
  - devem ser enviadas em tempo real utilizando Socket.io;

**Regras de negócio**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**Requisitos Funcionais**

- O usuário deve poder:
  - listar todos prestadores de serviço cadastrados;
  - listar os dias de um mês com pelo menos um horário disponível de um prestador;
  - listar horários disponíveis em um dia específico de um prestador;
  - realizar um novo agendamento com um prestador;

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**Regras de negócio**

- Os agendamentos devem:
  - estar disponíveis entre 8h às 18h (primeiro às 8h e último às 17h);
  - durar 1h;
- O usuário não deve poder:
  - agendar em horário já ocupado;
  - agendar em horário passado;
  - agendar horário consigo;
