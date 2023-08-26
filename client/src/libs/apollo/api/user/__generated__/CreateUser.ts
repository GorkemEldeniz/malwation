/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser_Message {
  __typename: "Message";
  message: string;
}

export interface CreateUser_createUser_Error {
  __typename: "Error";
  errorMessage: string;
}

export type CreateUser_createUser = CreateUser_createUser_Message | CreateUser_createUser_Error;

export interface CreateUser {
  createUser: CreateUser_createUser;
}

export interface CreateUserVariables {
  input: CreateUserInput;
}
