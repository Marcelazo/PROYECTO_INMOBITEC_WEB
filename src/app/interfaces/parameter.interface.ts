export interface IParameter {
  id: number;
  codigo: string;
  descripcion: string;
  estado: number;
  valor1?: number | null;
  valor2?: number | null;
  string1?: string | null;
  string2?: string | null;
  tipoDocId?: number | null;
  empresaId?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ParametersData {
  transferType: IParameter[];
  transferBank: IParameter[];
  typeOperation: IParameter[];
}
