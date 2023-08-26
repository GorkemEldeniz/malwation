/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteUserInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteUser
// ====================================================

export interface DeleteUser_deleteUser_Message {
  __typename: "Message";
  message: string;
}

export interface DeleteUser_deleteUser_Error {
  __typename: "Error";
  errorMessage: string;
}

export type DeleteUser_deleteUser = DeleteUser_deleteUser_Message | DeleteUser_deleteUser_Error;

export interface DeleteUser {
  deleteUser: DeleteUser_deleteUser;
}

export interface DeleteUserVariables {
  input: DeleteUserInput;
}
