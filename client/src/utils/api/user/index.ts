import { gql } from "@apollo/client";

const CREATE_USER = gql`
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

const UPDATE_USER = gql`
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

const DELETE_USER = gql`
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

const GET_USERS_LIST = gql`
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

const GET_ONE_USER = gql`
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

export { DELETE_USER, GET_ONE_USER, GET_USERS_LIST, UPDATE_USER, CREATE_USER };
