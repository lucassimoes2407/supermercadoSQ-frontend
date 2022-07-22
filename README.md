
# Projeto - 🛒*Supermercado SQ* 
<!-- <h1 align="center">
<img alt="Tela inicial da aplicação SupermercadoSQ" title="#SupermercadoSQ" src="" />
</h1> -->
<!-- <img src="https://img.shields.io/apm/l/vim-mode"/>
<img src="https://img.shields.io/npm/types/typescript?color=blue&label=language"/> -->
<h2>Sumário</h2>

* [Pre-requisitos](#pre-requisitos)
* [Como instalar o projeto](#instalar-projeto)
* [Funcionalidades](#funcionalidades)
* [Tecnologias](#tecnologias)
* [Novidades](#novidade)
* [Créditos](#creditos)
* [(Bonus) Configuração do Eslint](#eslint)

<h2 id="pre-requisitos">Pre-requisitos</h2>

* Node (v16^)
* Git
* npm ou yarn

<h2 id="instalar-projeto">Como instalar o projeto</h2>
<h3>
Baixar Projeto 
</h3>

```
git clone https://github.com/lucassimoes2407/supermercadoSQ-frontend.git
```

<h3>
Instalar as Dependências 
</h3>

```
npm install
```

O yarn possui diferentes formas de instalação dependendo de seu sistema operacional e de suas preferências.

<h3>
Iniciar Projeto 
</h3>

```
npm run start
```

# Arquitetura

| Pasta/Arquivo     | Responsabilidade                                                                      |
|-------------------|---------------------------------------------------------------------------------------|
| ./src             | Organização da arquitetura e arquivos de configuração do sistema.                     |
| ./src/assets      | Imagens utilizadas.                                                                   |
| ./src/components  | Pasta de components.                                                                  |
| ./src/config      | Arquivo de integração de back e front.                                                |
| ./src/hooks       | Pasta de hooks.                                                                       |
| ./src/pages       | Páginas do sistema.                                                                   |
| ./src/routers     | Rotas do sistema.                                                                     |
| ./src/services    | Chamadas das APIs.                                                                    |
| ./src/styles      | Padronização de cores do sistema.                                                     |

***

# Entidades do Sistema

## Usuários
#### Regras de negócio
ID|Descrição|
:---:|:---|
RNeg-01| O sistema deve garantir que os dados username e email, de usuário, devem ser únicos 
RNeg-02| O sistema deve garantir que um usuário não seja apagado e sim deixado como inativo
RNeg-03| O sistema deve garantir que ao atualizar os dados de um usuário as regras RNeg-01 e RNeg-02, sejam mantidas

#### Endpoints
| Rota                              | Método | Função                                                       |
|-----------------------------------|--------|--------------------------------------------------------------|
| /users/                           | GET    | Lista todos os usuários                                      |
| /users/username/:username         | GET    | Lista um usuário a partir do username                        |
| /users/id/:id                     | GET    | Lista um usuário a partir do id                              |
| /users/findUsersActive            | GET    | Lista todos os usuários definidos como ativos                |
| /users/findUsersInactive          | GET    | Lista todos os usuários definidos como inativos              |
| /users/                           | POST   | Cria um usuário                                              |
| /users/login                      | POST   | Rota para login                                              |
| /users/logout                     | POST   | Rota para logout                                             |
| /users/setUserActiveAttribute/:id | PUT    | Muda um usuário para ativo ou inativo a partir de um id      |
| /users/:id                        | PUT    | Atualiza um usuário a partir do id   
| /users/:username                  | DELETE | Deleta um usuário a partir do username                       |
| /users/id/:id                     | DELETE | Deleta um usuário a partir do id   

***

## Produtos

#### Regras de negócio
| Id      | Descrição                                                                  |
|---------|----------------------------------------------------------------------------|
| RNeg-01 | Deve ser registrado quem criou qual produto.                               |
| RNeg-02 | Os campos 'Nome' e 'Ingredientes' devem, obrigatoriamente, conter valores. |
| RNeg-03 | Um usuário pode cadastrar até 06 imagens por produto.                      |


#### EndPoints
| Rota                              | Método | Função                                                       |
|-----------------------------------|--------|--------------------------------------------------------------|
| /products/                        | GET    | Lista todos os produtos                                      |
| /products/:productCode            | GET    | Lista um produto a partir do id                              |
| /products/name/:productName       | GET    | Lista produtos com determinado nome                          |
| /products/ingredient/:productIngredient       | GET    | Lista produtos com determinado ingrediente       |
| /products/brand/:productBrand     | GET    | Lista produtos de determinada marca                          |
| /products/                        | POST   | Cria um produto                                              |
| /products/filtered/               | POST   | Filtra produtos com base em nome, e com/sem ingredientes especificos|
| /products/                        | PUT    | Atualiza os dados de um produto                              |
| /products/:productCode            | DELETE | Deleta um produto a partir do id  

***

## Restrições

#### Regras de negócio
ID|Descrição|
:---:|:---|
RNeg-01| O sistema deve permitir o cadastro de dados pelos usuários
RNeg-02| O sistema deve permitir a visualização dos dados cadastrados
RNeg-03| O sistema deve permitir a remoção dos dados cadastrados
RNeg-04| O sistema deve permitir a edição dos dados cadastrados

## Usuários X Restrições

#### Regras de negócio
| Id      | Descrição                                                                    |
|---------|------------------------------------------------------------------------------|
| RNeg-01 | Cada entrada na tabela deve conter apenas um cod_usuario e um cod_restricao. |
| RNeg-02 | Podem haver diversas entradas para o mesmo usuário, variando as restrições.  |
| RNeg-03 | Podem haver diversas entradas para uma mesma restrição, variando os usuários.  |

#### EndPoints
| Rota                              | Método | Função                                                       |
|-----------------------------------|--------|--------------------------------------------------------------|
| /user-restriction/:cod_usuario    | GET    | Pega todas as restrições de um usuário                       |
| /user-restriction/:cod_usuario    | POST   | Adicionar uma restrição de um usuário                        |
| /user-restriction/:cod_usuario    | DELETE | Deleta uma restrição de um usuário                           |

***

## Produtos X Restrições

#### Regras de negócio
| Id      | Descrição                                                                    |
|---------|------------------------------------------------------------------------------|
| RNeg-01 | Cada entrada na tabela deve conter apenas um cod_produto e um cod_restricao. |
| RNeg-02 | Podem haver diversas entradas para o mesmo produto, variando as restrições.  |
| RNeg-03 | Pordem haver diversas entradas para a mesma restrição, variando os produtos. |

#### EndPoints
| Rota                              | Método | Função                                                       |
|-----------------------------------|--------|--------------------------------------------------------------|
| /product-restriction/:cod_produto | GET    | Mosta todas as restrições que um produto pode estar inserido |
| /product-restriction/:cod_produto | POST   | Cria uma nova restição associada a um produto                |
| /product-restriction/:cod_produto | DELETE | Apaga uma restrição associada a um produto                   |

***
