<h2>API GraphQl</h2>

**Acessar Dashboard GraphyQl**
<p>Criar e testar Queries e Mutations</p>

```
http://127.0.0.1:8080/graphql
```
**Gerador de grande volume de dados para teste**
```
https://www.mockaroo.com/
```

**nodemon -r esm .**
<p>nodemon - Checks if project files have changed by restarting Node.</p>
<p>-r - Allows running multiple files simultaneously.</p>
<p>esm - ECMAScript module loader.</p>
<p>. - Indicates the project root</p>

-------------------------------------------------------------------------------

**Trabalhando com pacotes**
<p>Esta forma serve para criar um monorepo, que guarda os arquivos do servidor e da interface do usuário (web).
Com esta configuração é possível instalar as dependências dos dois projeto com apenas um comando, assim como inicia-los.</p>

**Inicie o projeto**
```
pnpm init
```

**Crie o arquivo**
```
pnpm-workspaces.yaml
```

**Escreva no arquivo:**
```
packages:
  - 'packages/**'
```
Note: Vai realizar a inicialização de todos os pacotes contidos dentro da pasta "package"

**Altere o nome do projeto no package.json de cada um dos repositórios (server e web)** <br>
Ex: "name": "@api_graphql/server",

**Instalação das dependências do projeto com o gerenciador de pacotes pnpm**
```
pnpm i
```

**Execute o comando para instalar as dependências do projeto server**
```
pnpm i --filter @api_graphql/server
```

**Iniciar o projeto na raiz**
```
pnpm --filter @api_graphql/server run start
```

**Instalação do Apollo Server para o GraphQL**
```
pnpm i apollo-server-express --filter @api_graphql/server
```

-------------------------------------------------------------------------------

**Instalação do Express**
```
pnpm i express --filter @api_graphql/server
```

**Lidar com a politica CORS**
<p>A politica cors não permite que aplicações externas acesse o servidor.</p>
<p>Desta forma é necessário adicionar uma permissão para que aplicações externas possam acessar o servidor.</p>

```
pnpm i cors --filter @api_graphql/server
```

**Criar UUID**
<p>Que gera IDs para a criação de novos clientes.</p>

```
pnpm i uuid --filter @api_graphql/server
```
-------------------------------------------------------------------------------

<h2>React package</h2>

**React install**
```
pnpx create-react-app packages/web
```

**Alterar o nome do projeto em package.json**
```
"name": "@api_graphql/web",
```

**Instalar as dependências do projeto web**
```
pnpm i --filter @api_graphql/web
```

**Iniciar o projeto na raiz**
```
pnpm --filter @api_graphql/web run start
```
**O que é o index.html ?**
<p>Página template para todas as páginas da aplicação, uma vez que todas as páginas serão carregadas dentro deste mesmo template.</p>

**O que é o manifest.json ?**
<p>Utilizado para configurar e transformar o site em um aplicativo para Android.</p>

**O que é o robots.txt ?**
<p>Serve para que o algorítimo de busca do Google veja a página.</p>

**Instalar o react-router-dom**
```
pnpm i react-router-dom --filter @api_graphql/web
```
<p>Obs:Caso não esteja utilizando uma implementação do apollo server é possível importar utilizando uma biblioteca chamada graphQl Tag. Ela utiliza o mesmo GQL</p>

```
npm i graphql-tag
```

**Instalação do Apollo Link**
```
pnpm i apollo-link apollo-link-context apollo-link-error apollo-link-http --filter @api_graphql/web
```

**Instalar Apollo Client**
```
pnpm i apollo-client graphql graphql-tag react-apollo apollo-cache-inmemory --filter @api_graphql/web
```

-------------------------------------------------------------------------------
<h3>VSCode</h3>
<p>Formatar os dados rapidamente:</p>
<p>F1 + Digite: Format Document (Forced)</p>

-------------------------------------------------------------------------------
<h3>Consultas</h3>
<p>URL</p>

```
http://127.0.0.1:8080/graphql
```

**Queries de Teste**

```
# Fragmemnto - Criar um agrupamento de atributos para reutizar nas consultas.
fragment CLIENT_FRAGMENT on Client {
  name
  email
}

query GET_CLIENT($clientId: ID!) {
  # Dados de um determinado Cliente.
  client(id: $clientId) {
    id
    ...CLIENT_FRAGMENT
    disabled
  }
 
  # Lista com paginação que retorna o ID dos Clientes.
  clients(options: {
    skip: 0,
    take: 10,
    sort: {
      sorter: "disabled",
      sortment: ASC
    },
    filter: {
      # Por nome de cliente
      #name: "%Waly%"
      #name: "Waly Skinner"

      # Por estado - ativo ou não
      disabled: true
    }
  }){
    items {
      ...CLIENT_FRAGMENT
      disabled
    }
    totalItems
  }
}

```

<p>Valor das variáveis</p>

```
{
  "clientId": "37e29d14-e20a-4d92-ac29-abe92dfe10ac"
}
```

**Mutations de teste**

<p>Cria um novo cliente</p>

```
mutation {
  createClient(input: {
    name: "Rodrigo M S",
    email: "rms@localhost.com"
  }) {
    # Retorno
    id
    name
    email
    disabled
  }
}
```

<p>Atualiza os dados do cliente</p>

```
mutation {
  updateClient(input: {
    id: "a36e9e8a-a9c5-4675-a692-9ddb8dde911f"
    name: "Rodrigo M S",
    email: "rodrigoms@localhost.com"
  }) {
    # Retorno
    id
    name
    email
    disabled
  }
}
```

<p>Deletar dados do cliente</p>

```
mutation {
  deleteClient(id: "a36e9e8a-a9c5-4675-a692-9ddb8dde911f") {
    id
    name
    email
    disabled
  }
}
```
<p>Habilitar e desabilitar um cliente</p>

```
fragment CLIENT_FRAGMENT on Client {
  id
  name
  email
  disabled
}

mutation {
  disableClient(id: "121080bd-627b-403b-93f3-d24c01ff915c") {
    ...CLIENT_FRAGMENT
  }

  #enableClient(id: "121080bd-627b-403b-93f3-d24c01ff915c") {
  #  ...CLIENT_FRAGMENT
  #}
}
```

25 - 05:22

Ver
https://dev.to/mensonones/consumindo-api-graphql-usando-react-e-apollo-client-4blo
https://www.youtube.com/watch?v=FK6S13uw9U0