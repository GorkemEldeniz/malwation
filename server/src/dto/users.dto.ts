import { Field, InputType, ObjectType, createUnionType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Error } from './common.dto';

/* Get Users List */
@ObjectType()
export class GetUsersListItem {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  createdAt: number;
  @Field()
  active: boolean;
}
@ObjectType()
export class GetUsersList {
  @Field(() => [GetUsersListItem])
  users: GetUsersListItem[];
}
@InputType()
export class GetUsersListInput {
  @IsString()
  @Field()
  name: string;
}
export const GetUsersListResult = createUnionType({
  name: 'GetUsersListResult',
  types: () => [GetUsersList, Error] as const,
  resolveType(value: any) {
    if (value.errorMessage) {
      return Error;
    }
    return GetUsersList;
  },
});
/* Get Users List */

/* Get One User */
@InputType()
export class GetOneUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;
}
@ObjectType()
export class GetOneUser {
  @Field()
  name: string;
  @Field()
  active: boolean;
  @Field(() => [String])
  permissions: string[];
}
export const GetOneUserResult = createUnionType({
  name: 'GetOneUserResult',
  types: () => [GetOneUser, Error] as const,
  resolveType(value: any) {
    if (value.errorMessage) {
      return Error;
    }
    return GetOneUser;
  },
});
/* Get One User */

/* Delete User */
@InputType()
export class DeleteUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;
}
/* Delete User */

/* Update User */
@InputType()
export class UpdateUserInputField {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @Field()
  password: string;

  @IsBoolean()
  @Field()
  active: boolean;

  @IsString({ each: true })
  @IsArray()
  @Field(() => [String])
  permissions: string[];
}

@InputType()
export class UpdateUserInput {
  @Field(() => UpdateUserInputField)
  user: UpdateUserInputField;

  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;
}
/* Update User */

/* Create User */
@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;
}
/* Create User */
