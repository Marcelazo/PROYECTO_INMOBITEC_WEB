import {
  IAccountType,
  IBank,
  IBankAccount,
  ICoin,
} from '../interfaces/bank-account.interface';

export class BankAccount {
  id: number;
  bankId: number;
  accountTypeId: number;
  coinId: number;
  codeId: number;
  projectId: number;
  accountNumber: string;
  bank: IBank;
  accountType: IAccountType | null;
  coin: ICoin | null;
  createdAt: string;
  updatedAt: string;

  constructor(data: IBankAccount) {
    this.id = data.id;
    this.bankId = data.bancoId;
    this.accountTypeId = data.tipoCuentaId;
    this.coinId = data.monedaId;
    this.codeId = data?.codigoId;
    this.projectId = data?.proyectoId;
    this.accountNumber = data?.nroCuenta ?? '';
    this.bank = data?.bank;
    this.accountType = data?.accountType;
    this.coin = data?.coin;
    this.createdAt = data?.createdAt ?? new Date().toUTCString();
    this.updatedAt = data?.updatedAt ?? new Date().toUTCString();
  }

  get accountName(): string {
    const bankName = this.bank?.nombre;

    return `${bankName} - ${this.accountNumber}`.trim();
  }
}
