/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_Message {
  __typename: "Message";
  message: string;
}

export interface UpdateUser_updateUser_Error {
  __typename: "Error";
  errorMessage: string;
}

export type UpdateUser_updateUser =
  | UpdateUser_updateUser_Message
  | UpdateUser_updateUser_Error;

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  input: UpdateUserInput;
}
