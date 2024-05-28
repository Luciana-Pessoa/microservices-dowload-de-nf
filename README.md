````markdown
# Microservice E-mail

Um microserviço para gerenciar e-mails utilizando Docker.

## Pré-requisitos

Antes de começar, você precisa ter os seguintes softwares instalados em sua máquina:

- Git
- Docker
- Docker Compose
- Postman para testar API

## Executar o projeto

### Clone este repositório

```bash
git clone <url-do-repositorio>
```
````

### Acesse a pasta do projeto no terminal/cmd

```bash
cd nome-do-projeto
```

### Configuração do arquivo de ambiente

No arquivo `.env.exemplo`, renomeie para `.env` e adicione seu usuário e senha do e-mail:

```
EMAIL=seu-email@example.com
PASSWORD=sua-senha
HOST=imap.seu-servidor.com
PORT=993
```

### Use o Docker Compose para construir e iniciar os contêineres

```bash
docker-compose up --build
```

Agora, o servidor deve estar rodando em [http://localhost:3000](http://localhost:3000) (ou qualquer porta que você tenha configurado).

## Testando a API

Para testar a API, você pode usar Postman ou qualquer outra ferramenta de sua escolha para enviar solicitações HTTP.

### Exemplo de teste com curl

Aqui está um exemplo de como testar a rota POST `/api/getDocuments`:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"chave1":"valor1", "chave2":"valor2"}' http://localhost:3000/api/getDocuments
```

Substitua `"chave1"`, `"valor1"`, `"chave2"`, `"valor2"` pelos nomes e valores reais que você deseja enviar no payload.

## Licença

Este projeto está sob a licença MIT.

## Contato

Feito com ❤️ por Luciana Pessoa 👋🏽 Entre em contato!

```

```
