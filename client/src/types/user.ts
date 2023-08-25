export interface IUser {
  id: string;
  name: string;
  active: boolean;
  permissions: string[];
  password: string;
  createdAt: number;
}
