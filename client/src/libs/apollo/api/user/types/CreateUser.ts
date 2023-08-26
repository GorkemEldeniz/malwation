/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "../../../../../../__generated__/globalTypes";
import * as z from "zod";

export const RegisterForm = z.object({
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

export type IRegisterInput = z.infer<typeof RegisterForm>;

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

export type CreateUser_createUser =
  | CreateUser_createUser_Message
  | CreateUser_createUser_Error;

export interface CreateUser {
  createUser: CreateUser_createUser;
}

export interface CreateUserVariables {
  input: CreateUserInput;
}
