import { IRental } from "./IRental";

export interface IRentalResponse {
  count: number;
  next: string;
  previous: string;
  results: IRental[];
}