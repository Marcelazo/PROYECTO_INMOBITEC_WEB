import { StateBadge } from '../interfaces/state-badge.interface';
import { IDocumentType, IUser } from '../interfaces/user.interface';
import { environment as env } from 'src/environments/environment';

export const USER_STATUSES: StateBadge[] = [
  {
    id: 0,
    type: 'danger',
    description: 'Inactivo',
  },
  {
    id: 1,
    type: 'success',
    description: 'Activo',
  },
];

export class User {
  id: number | string;
  documentType: IDocumentType | null;
  conId: string | null;
  employeeId: string | null;
  name: string;
  lastname: string;
  fatherSurname: string;
  motherSurname: string;
  email: string;
  document?: string | null;
  phone?: string | null;
  cellphone?: string | null;
  avatar?: string | null;
  civilStatus: number | null;
  address?: string | null;
  reference?: string | null;
  //district: number | null;
  state: number;
  passwordReset: number;
  emailVerifiedAt?: string | null;
  createdAt: string;
  updatedAt: string;

  constructor(user: IUser) {
    this.id = user?.id ?? '';
    this.documentType = user?.documentType ?? null;
    this.conId = user?.conId ?? null;
    this.employeeId = user?.employeeId ?? null;
    this.name = user?.name ?? '';
    this.lastname = user?.lastname ?? '';
    this.fatherSurname = user?.fatherSurname ?? '';
    this.motherSurname = user?.motherSurname ?? '';
    this.email = user?.email ?? '';
    this.document = user?.document ?? null;
    this.phone = user?.phone ?? null;
    this.cellphone = user?.cellphone ?? null;
    this.avatar = user?.avatar ?? null;
    this.civilStatus = user?.civilStatus ?? null;
    this.address = user?.address ?? null;
    this.reference = user?.reference ?? null;
    //this.district = user?.district ?? null;
    this.state = user?.state ?? 0;
    this.passwordReset = user?.passwordReset ?? 0;
    this.emailVerifiedAt = user?.emailVerifiedAt ?? null;
    this.createdAt =
      user?.createdAt !== null && user?.createdAt !== ''
        ? user.createdAt
        : new Date().toUTCString();
    this.updatedAt =
      user?.updatedAt !== null && user?.updatedAt !== ''
        ? user.updatedAt
        : new Date().toUTCString();
  }

  /**
   * Create a new instaceof User
   * @return new User
   */
  static empty(data?: { [key: string]: any }): User {
    return new User({
      id: '',
      documentType: null,
      conId: null,
      employeeId: null,
      name: '',
      lastname: '',
      fatherSurname: '',
      motherSurname: '',
      email: '',
      civilStatus: null,
      //district: null,
      state: 0,
      passwordReset: 0,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      ...data,
    });
  }

  get fullName(): string {
    return `${this.name} ${this.lastname}`.trim();
  }

  get sortName(): string {
    const [firstName] = this.name.split(' ');
    return `${firstName} ${this.fatherSurname}`.trim();
  }

  get needToResetPassword(): boolean {
    return this.passwordReset === 1 ? true : false;
  }

  get urlAvatar(): string {
    if (
      this.avatar !== undefined &&
      this.avatar !== null &&
      this.avatar.trim() !== ''
    ) {
      return `${env.url}/avatars/${this.avatar}`.trim();
    }

    return env.defaultAvatar;
  }

  /**
   * Get State Badge Role
   */
  get stateBadge(): StateBadge {
    if (this.state < 0 || this.state > 1) {
      return USER_STATUSES[0];
    }

    return USER_STATUSES[this.state];
  }

  toJson(): any {
    return {
      id: this.id,
      documentType: this.documentType,
      conId: this.conId,
      employeeId: this.employeeId,
      name: this.name,
      lastname: this.lastname,
      fatherSurname: this.fatherSurname,
      motherSurname: this.motherSurname,
      email: this.email,
      document: this.document,
      phone: this.phone,
      cellphone: this.cellphone,
      avatar: this.avatar,
      civilStatus: this.civilStatus,
      address: this.address,
      reference: this.reference,
      //district: this.district,
      state: this.state,
      passwordReset: this.passwordReset,
      // emailVerifiedAt: this.emailVerifiedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      // deletedAt: this.deletedAt,
    };
  }
}
