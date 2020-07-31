/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGrant = /* GraphQL */ `
  mutation CreateGrant(
    $input: CreateGrantInput!
    $condition: ModelGrantConditionInput
  ) {
    createGrant(input: $input, condition: $condition) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateGrant = /* GraphQL */ `
  mutation UpdateGrant(
    $input: UpdateGrantInput!
    $condition: ModelGrantConditionInput
  ) {
    updateGrant(input: $input, condition: $condition) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteGrant = /* GraphQL */ `
  mutation DeleteGrant(
    $input: DeleteGrantInput!
    $condition: ModelGrantConditionInput
  ) {
    deleteGrant(input: $input, condition: $condition) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
