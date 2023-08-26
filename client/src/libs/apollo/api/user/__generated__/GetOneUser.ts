/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOneUserInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetOneUser
// ====================================================

export interface GetOneUser_getOneUser_GetOneUser {
  __typename: "GetOneUser";
  name: string;
  active: boolean;
  permissions: string[];
}

export interface GetOneUser_getOneUser_Error {
  __typename: "Error";
  errorMessage: string;
}

export type GetOneUser_getOneUser = GetOneUser_getOneUser_GetOneUser | GetOneUser_getOneUser_Error;

export interface GetOneUser {
  getOneUser: GetOneUser_getOneUser;
}

export interface GetOneUserVariables {
  input: GetOneUserInput;
}
