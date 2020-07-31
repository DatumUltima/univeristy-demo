/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGrant = /* GraphQL */ `
  query GetGrant($id: ID!) {
    getGrant(id: $id) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const listGrants = /* GraphQL */ `
  query ListGrants(
    $filter: ModelGrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGrants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
