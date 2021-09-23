import { IUser } from './user.interface';

export interface IAuthentication {
  access_token: string;
  token_type: string; // Bearer
  expires_at: string;
  scope: string | null;
  // user: IUser;
}

export interface ClientAccess {
  username: string;
  password: string;
  remember_me: boolean;
}
