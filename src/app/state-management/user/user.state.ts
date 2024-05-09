import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Login } from "./user.actions";
import { ILoginData } from "../../interfaces/ILoginData";
import { UserService } from "../../services/user.service";
import { catchError, tap } from "rxjs/operators";
import * as jwt from 'jwt-decode';
import { Observable, of } from "rxjs";
import { ILoginResponse } from "../../interfaces/ILoginResponse";


export class UserStateModel {
  username: string;
  isAuthenticated: boolean;
  accessToken: string;
  userId: string;
  isAdmin: boolean;
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    username: null,
    isAuthenticated: false,
    accessToken: null,
    userId: null,
    isAdmin: false
  }
})
@Injectable()
export class UserState  {

  constructor(
    private userService: UserService
  ) {}

  @Action(Login)
  Login(ctx: StateContext<UserStateModel>, payload: {loginData: ILoginData}): Observable<ILoginResponse> {
   return this.userService.login(payload.loginData).pipe(
      tap((response) => {
        console.log('response', response)
        ctx.patchState({
          username: payload.loginData.username,
          isAuthenticated: true,
          accessToken: response.access,
          userId: jwt.jwtDecode(response.access)['user_id'],
          isAdmin: jwt.jwtDecode(response.access)['is_admin']
        })
      })
    );
  }
  
}