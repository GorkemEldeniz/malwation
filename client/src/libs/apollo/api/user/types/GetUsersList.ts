/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUsersListInput } from "../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetUsersList
// ====================================================

export interface GetUsersList_getUsersList_GetUsersList_users {
  __typename: "GetUsersListItem";
  id: string;
  name: string;
  createdAt: number;
  active: boolean;
}

export interface GetUsersList_getUsersList_GetUsersList {
  __typename: "GetUsersList";
  users: GetUsersList_getUsersList_GetUsersList_users[];
}

export interface GetUsersList_getUsersList_Error {
  __typename: "Error";
  errorMessage: string;
}

export type GetUsersList_getUsersList =
  | GetUsersList_getUsersList_GetUsersList
  | GetUsersList_getUsersList_Error;

export interface GetUsersList {
  getUsersList: GetUsersList_getUsersList;
}

export interface GetUsersListVariables {
  input: GetUsersListInput;
}
