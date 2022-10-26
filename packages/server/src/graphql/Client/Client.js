// Importa apenas a função gql.
import { gql } from 'apollo-server-express'
// * - Importa todas as funções.
import * as uuid from 'uuid'

import { getClients, getTotalClients } from '../../database/Connection'
import createRepository from '../../io/Database/createRepository'
import { ListSortmentEnum  } from '../List/List'

const clientRepository = createRepository('client')

// Criação dos Graphs
export const typeDefs = gql`
  # Types - São entidades
  # ! - Preenchimento obrigatório.
  type Client implements Node {
    id: ID!
    name: String!
    email: String!
    disabled: Boolean!
  }

  # Como List implementa Node não é necessário
  # implementa-lo novamente.
  type ClientList implements List {
    items: [Client!]!
    totalItems: Int!
  }

  input ClientListFilter {
    name: String
    email: String
    disabled: Boolean
  }

  # input - Elementos que não vão ser retornados.
  # Utilizado como argumento.
  input ClientListOptions {
    take: Int
    skip: Int
    sort: ListSort
    filter: ClientListFilter
  }

  extend type Query {
    # Query com argumentos - id: ID!
    client(id: ID!): Client

    # Query que retorna um array de clientes.
    # Sendo obrigatório retornar pelo menos um cliente no array
    # sendo que este array é obrigatório.
    # clients: [Client!]!

    # Para implementar a paginação com foi criado ClientList
    # envia-se a lista.
    clients(options: ClientListOptions): ClientList
  }

  input CreateClientInput {
    name: String!
    email: String!
  }

  # Atributos que vão vir do front-end para atualizar o cliente.
  input UpdateClientInput {
    id: ID!
    name: String!
    email: String!
  }

  extend type Mutation {
    createClient(input: CreateClientInput!): Client!
    updateClient(input: UpdateClientInput!): Client!
    deleteClient(id: ID!): Client!
    enableClient(id: ID!): Client!
    disableClient(id: ID!): Client!
  }
`

export const resolvers = {

  Query: {
    // Retorna um usuário a partir de um ID informado.
    client: async (
      _,// parent, // Indica que tem uma lista que acumula outros types. 
      { id }, // Objetos com argumentos. 
      //{   }, // Contexto, dados de contexto global. Ex: Verificar se o usuário esta autenticado.
      // info // Traz o ST (Árvore de sintaxe abstrata - todo o código gql na qual o javascript consegue interpreta-la) inteiro da query.
    ) => {

      // Lê os dados do arquivo.
      const clients = await clientRepository.read()
      return clients.find((client) => client.id == id)
    },

    // Retorna todos os clientes.
    /*clients: async () => {
      const clients = await clientRepository.read()
      return clients
    }*/

    // Retorna todos os clientes da lista, criando a paginação.
    clients: async (_, args) => {

      // Retorna uma 
      const {
        take = 10,
        skip = 0,
      } = args.options || {} // Ou vai vir um options ou um objeto vazio.

      /* Retorna os dados vindos do banco. */
      return {
        items: await getClients(skip, take),
        totalItems: await getTotalClients()
      }
    },
  },

  Mutation: {
    createClient: async (_, { input }) => {
      const clients = await clientRepository.read()

      const client = {
        id: uuid.v4(),
        name: input.name,
        email: input.email,
        disabled: false,
      }

      // Escrever todos os clientes mais este que está sendo criado.
      await clientRepository.write([...clients, client])

      return client
    },

    updateClient: async (_, { input }) => {
      const clients = await clientRepository.read()

      // find - Retorna o primeiro elemento que satisfaz a condição.
      // Neste caso o id do cliente deve ser idêntico ao id do input. 
      const currentClient = clients.find((client) => client.id === input.id)

      // Caso o Id não seja encontrado apresenta mensagem de erro.
      if (!currentClient)
        throw new Error(`No client with this id "${input.id}"`)

      const updatedClient = {
        // Pode-se fazer o spreed porque vem dos dados da aplicação.
        // Diferente de fazer spreed de dados vindos do front-end,
        // onde não se deve fazer, para se ter mais segurança na aplicação.  
        ...currentClient,
        name: input.name,
        email: input.email,
      }

      // Executa a função callback passada por argumento para cada elemento 
      // do Array e devolve um novo Array como resultado.
      // Este map retorna os dados atualizados. Qualquer outra ação que
      // não satisfaz retorna os dados salvos anteriormente.
      const updatedClients = clients.map((client) => {
        if (client.id === updatedClient.id) return updatedClient
        return client
      })

      await clientRepository.write(updatedClients)

      return updatedClient
    },

    deleteClient: async (_, { id }) => {
      const clients = await clientRepository.read()

      // find - Retorna o primeiro elemento que satisfaz a condição.
      // Neste caso o id do cliente deve ser idêntico ao id do input.
      const client = clients.find((client) => client.id === id)

      // Se não existir o id, para a execução.
      if (!client) throw new Error(`Cannot delete client with id "${id}"`)

      // Dodos os dados que não tiverem o id informado não serão excluídos.
      const updatedClients = clients.filter((client) => client.id !== id)

      await clientRepository.write(updatedClients)

      return client
    },

    // Habilitar um cliente.
    enableClient: async (_, { id }) => {
      const clients = await clientRepository.read()

      const currentClient = clients.find((client) => client.id === id)

      if (!currentClient) throw new Error(`No client with this id "${id}"`)

      if (!currentClient.disabled)
        throw new Error(`Client "${id}" is already enabled.`)

      const updatedClient = {
        ...currentClient,
        disabled: false,
      }

      const updatedClients = clients.map((client) => {
        if (client.id === updatedClient.id) return updatedClient
        return client
      })

      await clientRepository.write(updatedClients)

      return updatedClient
    },

    // Desabilitar um cliente.
    disableClient: async (_, { id }) => {
      const clients = await clientRepository.read()

      const currentClient = clients.find((client) => client.id === id)

      if (!currentClient) throw new Error(`No client with this id "${id}"`)

      if (currentClient.disabled)
        throw new Error(`Client "${id}" is already disabled.`)

      const updatedClient = {
        ...currentClient,
        disabled: true,
      }

      const updatedClients = clients.map((client) => {
        if (client.id === updatedClient.id) return updatedClient
        return client
      })

      await clientRepository.write(updatedClients)

      return updatedClient
    },
  }
}