export interface FormState {
  message: string | null;
  loading: boolean;
}

export interface FormErrors {
  [key: string]: {
    [key: string]: string;
  };
}
