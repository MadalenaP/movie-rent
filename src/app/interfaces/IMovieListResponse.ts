import { IMovie } from "./IMovie";

export interface IMovieListResponse {
  count: number;
  next: string;
  previous: string;
  results: IMovie[];
}