![header](https://advertorial-pages.s3.us-west-1.amazonaws.com/listicle/header.jpg)
## (DevInhouse 2022)

Projeto Api Conta365, é um projeto acadêmic do curso DevInhouse do Senai-SC.
Este projeto visa colocar em prática conceitos de Criação de uma API e utilização de endpoints.

Índice de conteúdos
=================
   * [Features](#features)
   * [Pré-requisitos](#pré-requisitos)
   * [Instalação](#instalação)
   * [Tabela descritiva dos endpoints de Usúarios](#tabela-descritiva-dos-endpoints-de-usúarios)
   * [Tabela descritiva dos endpoints das Contas Financeiras](#tabela-descritiva-dos-endpoints-das-contas-financeiras)
   * [Observação](#observação)
   * [Autor](#autor)
   



### Features

- [x] EndPoint para trazer dados de todos os usúarios
- [x] EndPoint para trazer dados de UM usúario através do Id
- [x] EndPoint para criar novos usúarios
- [x] EndPoint para atualizar dados do usúarios
- [x] EndPoint para deletar usúarios
- [x] EndPoint para listar todas as contas Financeiras
- [x] EndPoint para listar UMA conta Financeira com base no userId
- [x] EndPoint para adicionar gastos financeiros com base no userId
- [x] EndPoint para deletar gastos financeiros com base no userId e no Id da despesa
- [ ] EndPoint para listar gastos financeiros com base no mês e/ou ano

## Pré-requisitos

Para testar esse projeto você vai precisar ter instalado na sua máquina o Node.js.
Além disso é bom ter um editor de código, eu utilizo o VsCode.
Nos links abaixo você encotra os instalaveis para **_Node.js_** e **_VsCode_**:


- https://nodejs.org/en/
- https://code.visualstudio.com/


## Instalação

1- Clone ou baixe o projeto do endereço:
~~~~
https://github.com/claudiorhenns/Projeto-Backend-DevInhouse-Conta365.git
~~~~

2- Como o projeto não contém a pasta **node_modules**, será necessário instalar as dependências. No seu editor de código, execute o comando:

~~~~
npm install
~~~~

3- Inicie o servidor para testar a API com o comando:

~~~
npm start
~~~

4- Você pode testar os endpoints através da interface do **swagger** no seguinte endereço:

~~~~
http://localhost:4444/api-docs/#/
~~~~
![swagger](https://advertorial-pages.s3.us-west-1.amazonaws.com/listicle/swagger.jpg)

## Tabela descritiva dos endpoints de Usúarios

A tabela abaixo exemplifica os Endpoints utilizados para listar, criar, atualizar ou deletar os **_úsúarios_**.

| Método | EndPoint | Parametros | Descrição |
|--|--|--|--|
| GET | v1/users | --- | Acessa e retorna as informações de TODOS os usúarios |
| GET | v1/user/:id | id |Acessa e retorna as informações de UM usúario pelo ID|
| POST | v1/userCreate | {"name": String, "email": String} **devem ser enviados no corpo da requisição**|End point para criação de usuários. O id do usúario é gerado automaticamente|
|PATCH | v1/userUpdate/:id| **id** e os dados que desejam ser alterados (**nome** e/ou **email**). O id é passado como parametro na requisição e os campos "name" e "email " são passados no corpo da requisição.| Endpoint para atualização de dados dos usuários. O id NÃO pode ser alterado, mas deve ser informado para que o usúario seja enconrado. Atualiza UM usúario por vez. Só aceita os campos que ja existe na estrutura do objeto|
|DELETE| v1/userDelete/:id | id | Acessa e deleta UM usúario através de seu ID|


## Tabela descritiva dos endpoints das Contas Financeiras

A tabela abaixo exemplifica os Endpoints utilizados para listar, adicionar gastos ou deletar gastos de uma conta.

| Método | EndPoint | Parametros | Descrição |
|--|--|--|--|
| GET | v1/financial | --- | Acessa e retorna as informações de **TODAS** as contas financeiras do banco |
| GET | v1/financial/:userId | userId |Acessa e retorna as informações de **UMA** conta financeira do banco através do **ID do usúario**|
| POST | v1/financial/:userId | userId como parâmetro da requisição e um arquivo com extensão **xlsx** importado no corpo da requisição|Acessa uma planilha com extensão xlsx e importa as transações financeiras para UM usúario informado no endpoint|
|DELETE| v1/financial/:userId/:financialId | **userId** e **FinancialId** passados como parâmetros na requisição | Acessa uma conta financeira com base no Id do Usuário e **DELETA** a transação financeira com base no Id da transação|

### Observação
Para testar o endpoint POST das contas financeiras, é necessário enviar uma **planilha na extensão xlsx**. Esta planilha deve conter os campos **price, typeOfExpenses,date e name**. Para facilitar o teste de funcionamento da API, estou disponibilizando uma planilha com alguns valores já preenchidos e que pode ser baixada no link abaixo:


https://advertorial-pages.s3.us-west-1.amazonaws.com/listicle/database.xlsx

### Autor


![autor](https://advertorial-pages.s3.us-west-1.amazonaws.com/listicle/footer.jpg)


