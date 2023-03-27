## Projeto BlogsAPI

## Sobre
BlogsAPI é um projeto do curso de Desenvolvedor Web Full Stack da Trybe, para o módulo de back-end. Foi desenvolvido uma API RESTFul para um blog, utilizando arquitetura MSC - Models, Services e Controller utilizando MySQL como banco de dados.

## Arquivos:
&nbsp;&nbsp; A base do projeto foi desenvolvido pela Trybe (Dockerfile, package.json, docker-compose.yml e outras configurações). Arquivos desenvolvidos por mim:
- tudo na  pasta `./src/` ;

## Technologies:
&nbsp;&nbsp; Tecnologias aplicadas por mim no projeto:
- NodeJS;
- Express;
- Sequelize;
- MySQL;
- Docker;
- JWT;

## Como executar o projeto:
Etapas de instalação:
- Certifique-se de ter o docker instalado com as versões 1.29 ou superior;
- Clone o repositório;
- Execute o banco de dados e os contêineres Node com `docker-compose up -d`;
- Acesse o container do Node com `docker exec -it blogs_api bash`; 
- Instale todas as dependências dentro do container com  `npm install`;
- Execute `npm run prestart` para iniciar o banco de dados com Sequelize; 
- Execute a aplicação com `npm start`; 

![image](https://user-images.githubusercontent.com/96309898/206794002-3897d8df-949b-4c90-875a-734a3dd4f606.png)
*Imagem ilustrativa: Rota /categories retornando o status 401 por não ter um token válido
