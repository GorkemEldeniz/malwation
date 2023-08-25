import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { cwd } from 'process';
import { IUser } from 'src/types/users';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

@Injectable()
export class AppService {
  private readonly userDBpath: string = `${cwd()}/src/db/users.json`;

  getAllUser = async (): Promise<IUser[]> => {
    try {
      const users = await fs.readFileSync(this.userDBpath, 'utf8');
      return JSON.parse(users);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while connecting to the database.',
      );
    }
  };
  getOneUser = async (id: string): Promise<IUser> => {
    const DBusers = await this.getAllUser();
    const user = DBusers.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new NotFoundException('user not found.');
  };
  updateUser = async (id: string, data: { [n: string]: any }) => {
    try {
      const DBusers = await this.getAllUser();
      const user = DBusers.find((user) => user.id === id);
      if (!user) {
        throw new NotFoundException('user not found.');
      }

      const userNameCheck = DBusers.findIndex(
        (user) => user.name === data.name,
      );

      if (userNameCheck !== -1 && user.name !== data.name) {
        return false;
      }

      const users = DBusers.filter((user) => user.id !== id);
      await fs.writeFileSync(
        this.userDBpath,
        JSON.stringify([
          ...users,
          {
            ...user,
            ...data,
            password: data.password !== '' ? data.password : user.password,
          },
        ]),
      );
      return true;
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        'An error occurred while connecting to the database.',
      );
    }
  };
  deleteUser = async (id: string) => {
    try {
      const DBusers = await this.getAllUser();
      const usersFiltered = DBusers.filter((user) => user.id !== id);

      if (DBusers.length === usersFiltered.length) {
        throw new BadRequestException('user id is not void');
      }
      await fs.writeFileSync(this.userDBpath, JSON.stringify(usersFiltered));
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(
        'An error occurred while connecting to the database.',
      );
    }
  };
  createUser = async (user: IUser): Promise<boolean> => {
    try {
      const DBusers = await this.getAllUser();

      const usersFiltered = DBusers.findIndex(
        (item) => item.name === user.name,
      );

      if (usersFiltered > -1) {
        return false;
      }

      const users = await this.getAllUser();
      await fs.writeFileSync(this.userDBpath, JSON.stringify([...users, user]));
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while connecting to the database.',
      );
    }
  };
}
