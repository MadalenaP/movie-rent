export interface IMovie {
  uuid?: string;
  title: string;
  pub_date: number;
  duration: number;
  rating: number;
  description: string;
  poster_url: string;
  categories: string[];
}