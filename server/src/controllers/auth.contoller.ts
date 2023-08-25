import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AppService } from 'src/app.service';

import { LoginInput, LoginResult } from '@dto/auth.dto';

import timeoutHelper from 'src/helper/timeout';

@Resolver()
export class AuthController {
  constructor(private readonly appService: AppService) {}

  @Mutation(() => LoginResult)
  async login(@Args('input') input: LoginInput): Promise<typeof LoginResult> {
    const dbUsers = await this.appService.getAllUser();

    const user = dbUsers.find((item) => {
      return (
        item.name === input.name &&
        item.password === input.password &&
        item.active
      );
    });

    await timeoutHelper(1000);

    if (user) {
      return {
        id: user.id,
        name: user.name,
        permissions: user.permissions,
      };
    }

    return { errorMessage: 'name or password is not correct.' };
  }
}
