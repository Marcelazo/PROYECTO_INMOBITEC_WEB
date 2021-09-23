export interface EventChangeImage {
  id: number;
  file: File;
}

export interface EventCancelImage {
  id: number;
  state: string;
}
