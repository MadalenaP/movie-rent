
export interface IRentalPartial {
  rental_date: string;
  user: number;
  movie: string;
}

export interface IRental extends IRentalPartial{
  uuid: string;
  return_date: string;
  is_paid: boolean;
  charge: number;
  is_active?: boolean;
}