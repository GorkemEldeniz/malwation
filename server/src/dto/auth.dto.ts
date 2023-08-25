import { Field, InputType, ObjectType, createUnionType } from '@nestjs/graphql';
import { Error } from './common.dto';

@ObjectType()
export class LoginData {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field(() => [String])
  permissions: string[];
}

@InputType()
export class LoginInput {
  @Field()
  name: string;
  @Field()
  password: string;
}

export const LoginResult = createUnionType({
  name: 'LoginResult',
  types: () => [LoginData, Error] as const,
  resolveType(value: any) {
    if (value.errorMessage) {
      return Error;
    }
    return LoginData;
  },
});
