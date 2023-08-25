import { join } from 'path';
import { cwd } from 'process';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthController } from '@controllers/auth.contoller';
import { UsersController } from '@controllers/users.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(cwd(), 'schema.gql'),
    }),
  ],
  providers: [AppService, AuthController, UsersController],
})
export class AppModule {}
