export interface Ubigeo {
  id: number;
  department_id: number | null;
  province_id: number | null;
  type: number;
  inei_code: string;
  name: string;
  lat: string | null;
  long: string | null;
  state: number;
  created_at: string;
  updated_at: string;
}
