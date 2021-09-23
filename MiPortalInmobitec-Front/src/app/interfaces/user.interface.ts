export interface IUser {
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
  address?: string | null;
  civilStatus: number | null;
  state: number;
  passwordReset: number;
  emailVerifiedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IDocumentType {
  id: number;
  descripcion: string;
}
