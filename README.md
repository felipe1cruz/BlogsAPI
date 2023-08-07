## Projeto BlogsAPI

## Sobre
BlogsAPI é um projeto back-end, onde foi desenvolvido uma API RESTFul para um blog, utilizando arquitetura MSC - Models, Services e Controller utilizando MySQL como banco de dados.

## Arquivos:
&nbsp;&nbsp; A base do projeto foi desenvolvido pela Trybe (Dockerfile, package.json, docker-compose.yml e outras configurações). Arquivos desenvolvidos por mim:
- tudo na  pasta `./src/` ;

## Tecnologias:
&nbsp;&nbsp; Tecnologias aplicadas por mim no projeto:
- NodeJS;
- Express;
- Sequelize;
- MySQL;
- Docker;
- JWT;

## Como executar o projeto (com docker):
Etapas de instalação:
- Certifique-se de ter o docker instalado com as versões 1.29 ou superior;
- Clone o repositório;
- Acesse a pasta raiz do repositório e execute o comando `docker-compose up -d`;
- O comando acima irá subir dois containers: um container Node chamado blogs_api, e um container MySQL de nome blogs_api_db;
- Você deve acessar o container Node (blogs_api) para instalar as dependências do projeto. Execute o comando: `docker exec -it blogs_api bash`; 
- Já dentro da linha de comando do 'blogs_api', instale as dependências do projeto com o comando `npm install`;
- Execute o comando `npm run prestart`. Esse comando irá rodar os comandos Sequelize para criar e migrar o banco de dados MySQL; 
- Execute a aplicação com `npm start`;
- Você pode testar e depurar a API com programas como ThunderClient ou Postman. As rotas e os retornos esperados são explicados em 'Requisitos do projeto'.;
- A porta padrão para testar os requisitos é a 3000. (http://localhost:3000/);

## Diagrama ER e Entidades:
Para orientar a construção das tabelas através do ORM, foi utilizado o DER abaixo:
![image](https://github.com/felipe1cruz/BlogsAPI/assets/96309898/6c6f2ca3-2a17-4344-8676-5735c9e549c2)

## Requesitos do projeto:
### 1 - Crie migrations para as tabelas users, categories, blog_posts, posts_categories:
Foi criado migrations para as tabelas na pasta './src/migrations/'.

### 2 - Crie o modelo User em src/models/User.js com as propriedades corretas;

### 3 - Sua aplicação deve ter o endpoint POST /login;
O corpo da requisição deverá seguir o formato abaixo:
```json
{
  "email": "lewishamilton@gmail.com",
  "password": "123456"
}
```
Caso a requisição não tiver todos os campos devidamente preenchidos, o retorno será um status `400`com a mensagem:
```json
{
  "message": "Some required fields are missing"
}
```
Caso a requisição receba um usuário errado/inexistente, o retorno será um status `400`com a mensagem:
```json
{
  "message": "Invalid fields"
}
```
Se o login for feito com sucesso, o retorno será status `200`com um token de autenticação:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
}
```
### 4 - Sua aplicação deve ter o endpoint POST /user
O corpo da requisição deverá seguir o formato abaixo:
```json
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  // a imagem não é obrigatória
}
```
Caso displayName, email ou password não estejam preenchido, o sistema retornará status `400` com uma mensagem personalizada, dependendo do campo que esteja faltando:
```json
{
  "message": "\"displayName\" length must be at least 8 characters long"
}
```
```json
{
  "message": "\"email\" must be a valid email"
}
```
```json
{
  "message": "\"password\" length must be at least 6 characters long"
}
```
Também é feito uma conferência para não ser possível cadastrar um email que já esteja cadastrado. Caso o email já esteja cadastrado, será retornado status `409`com a mensagem:
```json
{
  "message": "User already registered"
}
```
Caso tudo esteja correto e o usuário seja cadastrado corretamente, o retorno será status `201`com o token:
```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
```
Os próximos requisitos precisarão do token para serem testados. O token gerado ou pelo login, ou pelo cadastro do usuário deve ser salvo como header no formato:
```json
header: authorization
value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzcGxheU5hbWUiOiJGZWxpcGUgQ3J1eiIsImVtYWlsIjoiZmVsaXBlQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaW1hZ2UiOiJodHRwOi8vNC5icC5ibG9nc3BvdC5jb20vX1lBNTBhZFEtN3ZRL1MxZ2ZSXzZ1ZnBJL0FBQUFBQUFBQUFrLzFFckpHZ1JXWkRnL1M0NS9icmV0dC5wbmciLCJpYXQiOjE2OTE0MTMzOTcsImV4cCI6MTY5MzE0MTM5N30.hELaGIdRMPw9xruZhH5Rr8epEkkiqq1muYTXEzGY9VU
(sem aspas)
```
Caso o token seja inexistente o retorno será status `401`com a mensagem:
```json
{
  "message": "Token not found"
}
```
Se o token for inválido ou estiver expirado, o retorno será status `401`e a mensagem:
```json
{
  "message": "Expired or invalid token"
}
```
### 5 - Sua aplicação deve ter o endpoint GET /user
Ao listar os usuário com sucesso, o retorno será status `200`com a mensagem:
```json
[
  {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },

  /* ... */
]
```
### 6 - Sua aplicação deve ter o endpoint GET /user/:id
Ao listar um usuário com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http 200:
```json
{
  "id": 1,
  "displayName": "Lewis Hamilton",
  "email": "lewishamilton@gmail.com",
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
}
```
Caso o id do usuário solicitado seja inexistente, o retorno será status `404`:
```json
{
  "message": "User does not exist"
}
```

### 7 - Crie o modelo Category em src/models/Category.js com as propriedades corretas

### 8 - Sua aplicação deve ter o endpoint POST /categories
O corpo da requisição deverá seguir o formato abaixo: 
```json
{
  "name": "Typescript"
}
```
caso "name" não for preenchido, o retorno será status `400` com a mensagem:
```json
{
  "message": "\"name\" is required"
}
```
Se a categoria for criada com sucesso, o retorno será status `201`:
```json
{
  "id": 3,
  "name": "Typescript"
}
```

### 9 - Sua aplicação deve ter o endpoint GET /categories
Ao listar as categorias com sucesso, status `200`:
```json

[
  {
      "id": 1,
      "name": "Inovação"
  },
  {
      "id": 2,
      "name": "Escola"
  },

  /* ... */
]
```

### 10 - Crie o modelo BlogPost em src/models/BlogPost.js com as propriedades e associações corretas

### 11 - Crie o modelo PostCategory em src/models/PostCategory.js com as propriedades e associações corretas

### 12 - Sua aplicação deve ter o endpoint POST /post
O corpo da requisição deverá seguir o formato abaixo:
```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```
### 13 - Sua aplicação deve ter o endpoint GET /post
Ao listar posts com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http 200:
```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  },
  
  /* ... */
]
```

### 14 - Sua aplicação deve ter o endpoint GET /post/:id
o listar um post com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http 200:
```json
{
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
      {
          "id": 1,
          "name": "Inovação"
      }
  ]
}
```

Caso o post não exista, o retorno será status 404 com a mensagem:
```json
{
  "message": "Post does not exist"
}
```

### 15 - Sua aplicação deve ter o endpoint PUT /post/:id
O corpo da requisição deverá seguir o formato abaixo: 
```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```






