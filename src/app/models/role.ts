export const ROLES: string[] = ['user', 'admin'];

export class Role {
  constructor() {}

  /**
   * Rol Usuario
   *
   * @returns string
   */
  static user = 'user';

  /**
   * Rol Admin
   *
   * @returns string
   */
  static admin = 'admin';
}
