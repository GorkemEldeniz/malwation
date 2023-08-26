import { gql } from "@apollo/client";

const CreateUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      __typename
      ... on Message {
        message
      }
      ... on Error {
        errorMessage
      }
    }
  }
`;

const UpdateUser = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      __typename
      ... on Message {
        message
      }
      ... on Error {
        errorMessage
      }
    }
  }
`;

const DeleteUser = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      __typename
      ... on Message {
        message
      }
      ... on Error {
        errorMessage
      }
    }
  }
`;

const GetUsersList = gql`
  query GetUsersList($input: GetUsersListInput!) {
    getUsersList(input: $input) {
      __typename
      ... on GetUsersList {
        users {
          id
          name
          createdAt
          active
        }
      }
      ... on Error {
        errorMessage
      }
    }
  }
`;

const GetOneUser = gql`
  query GetOneUser($input: GetOneUserInput!) {
    getOneUser(input: $input) {
      __typename
      ... on GetOneUser {
        name
        active
        permissions
      }
      ... on Error {
        errorMessage
      }
    }
  }
`;

export { DeleteUser, GetOneUser, GetUsersList, UpdateUser, CreateUser };
