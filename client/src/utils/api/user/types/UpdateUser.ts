/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "../../../../../__generated__/globalTypes";
import * as z from "zod";

export const permissionsArray = ["Read", "Create", "Delete", "Update"] as const;
export const UpdateForm = z.object({
  name: z
    .string()
    .min(2)
    .max(15)
    .regex(new RegExp("^[a-z0-9]*$", "gi"), "Invalid Character"),
  password: z
    .string()
    .regex(new RegExp("^[a-z0-9]*$", "gi"), "Invalid Character")
    .refine(
      (value) => value.length === 0 || (value.length > 2 && value.length < 15),
      "Password must be maximum 15 and minimum 2 characters"
    ),
  active: z.boolean(),
  permissions: z.array(z.enum(permissionsArray)),
});

export type IUpdateInput = z.infer<typeof UpdateForm>;

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
