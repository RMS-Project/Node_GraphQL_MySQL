/* Cria paginações para dados em arquivos. */

import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  interface List {
    items: [Node!]! # Não se pode ter [null] ou null.
    totalItems: Int!
  }

  # Criação de tipos específicos.
  enum ListSortmentEnum {
    ASC
    DESC
  }

  input ListSort {
    # Ordenador
    sorter: String!

    # Ordenação
    sortment: ListSortmentEnum!
  }
`;

// Como o JavaScript não tem enum, cria-se um objeto
// que não pode ser modificado com "freeze".
export const ListSortmentEnum = Object.freeze({
  // O graphQl vai recebe-los e utiliza-los com string.
  ASC: 'ASC',
  DESC: 'DESC',
});

export const resolvers = {
  List: {
    __resolveType: () => null,
  },
};
