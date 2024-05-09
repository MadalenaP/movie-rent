import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IMovie } from "../../interfaces/IMovie";
import { Injectable } from "@angular/core";
import { GetMovies } from "./movies.actions";
import { UserStateModel } from "../user/user.state";

export class MoviesStateModel {
  movies: IMovie[];
}

@State<MoviesStateModel>({
  name: 'movies',
  defaults: {
    movies: []
  }
})
@Injectable()
export class MoviesState {
  
  @Selector()
  static movies(state: MoviesStateModel):  IMovie[] {
    return state.movies;
  }

  @Action(GetMovies)
  GetMovies(ctx: StateContext<UserStateModel>): void {
    
  }
}