import { MessageOrErrorResult } from '@dto/common.dto';
import {
  CreateUserInput,
  DeleteUserInput,
  GetOneUserInput,
  GetOneUserResult,
  GetUsersListInput,
  GetUsersListItem,
  GetUsersListResult,
  UpdateUserInput,
} from '@dto/users.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import timeoutHelper from 'src/helper/timeout';

@Resolver()
export class UsersController {
  constructor(private readonly appService: AppService) {}

  @Query(() => GetUsersListResult)
  async getUsersList(
    @Args('input') input: GetUsersListInput,
  ): Promise<typeof GetUsersListResult> {
    const usersDB = await this.appService.getAllUser();

    const usersFiltered = input.name
      ? usersDB.filter(
          (user) => user.name.toLocaleLowerCase().search(input.name) >= 0,
        )
      : usersDB;

    const users: GetUsersListItem[] = usersFiltered.map((user) => ({
      id: user.id,
      name: user.name,
      active: user.active,
      createdAt: user.createdAt,
    }));

    return { users };
  }

  @Query(() => GetOneUserResult)
  async getOneUser(
    @Args('input') input: GetOneUserInput,
  ): Promise<typeof GetOneUserResult> {
    const userDB = await this.appService.getOneUser(input.id);
    return {
      name: userDB.name,
      active: userDB.active,
      permissions: userDB.permissions,
    };
  }

  @Mutation(() => MessageOrErrorResult)
  async deleteUser(
    @Args('input') input: DeleteUserInput,
  ): Promise<typeof MessageOrErrorResult> {
    await this.appService.deleteUser(input.id);
    await timeoutHelper(2000);
    return { message: `${input.id} deleted.` };
  }

  @Mutation(() => MessageOrErrorResult)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<typeof MessageOrErrorResult> {
    const time = new Date().getTime();

    const isSuccess = await this.appService.createUser({
      id: time.toString(),
      name: input.name,
      active: true,
      permissions: [],
      password: input.password,
      createdAt: time,
    });

    await timeoutHelper(2000);

    if (isSuccess) {
      return { message: 'User created successfull.' };
    }
    return { errorMessage: 'Name is used by another user' };
  }

  @Mutation(() => MessageOrErrorResult)
  async updateUser(
    @Args('input') input: UpdateUserInput,
  ): Promise<typeof MessageOrErrorResult> {
    const isSuccess = await this.appService.updateUser(input.id, {
      ...input.user,
    });

    await timeoutHelper(2000);

    if (isSuccess) {
      return { message: 'User updated successfull.' };
    }
    return { errorMessage: 'Name is used by another user' };
  }
}
