/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateUserInput {
  name: string;
  password: string;
}

export interface DeleteUserInput {
  id: string;
}

export interface GetOneUserInput {
  id: string;
}

export interface GetUsersListInput {
  name: string;
}

export interface LoginInput {
  name: string;
  password: string;
}

export interface UpdateUserInput {
  user: UpdateUserInputField;
  id: string;
}

export interface UpdateUserInputField {
  name: string;
  password: string;
  active: boolean;
  permissions: string[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
