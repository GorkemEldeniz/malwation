import { Field, ObjectType, createUnionType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  message: string;
}
@ObjectType()
export class Error {
  @Field()
  errorMessage: string;
}

export const MessageOrErrorResult = createUnionType({
  name: 'MessageOrErrorResult',
  types: () => [Message, Error] as const,
  resolveType(value: any) {
    if (value.errorMessage) {
      return Error;
    }
    return Message;
  },
});
