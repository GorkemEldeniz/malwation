/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "../../../../../../__generated__/globalTypes";
import * as z from "zod";

export const LoginForm = z.object({
  name: z
    .string()
    .min(2)
    .max(15)
    .regex(new RegExp("^[a-z0-9]*$", "gi"), "Invalid Character"),
  password: z
    .string()
    .min(2)
    .max(15)
    .regex(new RegExp("^[a-z0-9]*$", "gi"), "Invalid Character"),
});

export type ILoginInput = z.infer<typeof LoginForm>;

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_LoginData {
  __typename: "LoginData";
  id: string;
  name: string;
  permissions: ("Read" | "Create" | "Delete" | "Update")[];
}

export interface Login_login_Error {
  __typename: "Error";
  errorMessage: string;
}

export type Login_login = Login_login_LoginData | Login_login_Error;

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  input: LoginInput;
}
