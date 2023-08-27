import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      __typename
      ... on LoginData {
        id
        name
        permissions
      }
      ... on Error {
        errorMessage
      }
    }
  }
`;

export default LOGIN;
