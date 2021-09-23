export interface FormState {
  message: string | null;
  loading: boolean;
  error?: boolean;
}

export interface FormErrors {
  [key: string]: {
    [key: string]: string;
  };
}
