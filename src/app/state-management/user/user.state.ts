import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetProfile, SetIsAdmin, SetIsAuthenticated, SetUserData, SetUserId } from "./user.actions";
import { UserService } from "../../services/user.service";
import { Observable, tap } from "rxjs";
import { IProfile } from "../../interfaces/IProfile";


export class UserStateModel {
  username: string;
  isAuthenticated: boolean;
  userId: string;
  isAdmin: boolean;
  email: string;
  first_name: string;
  last_name: string;
  wallet: number;
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    username: null,
    isAuthenticated: false,
    userId: null,
    isAdmin: false,
    email: null,
    first_name: null,
    last_name: null,
    wallet: 0
  }
})
@Injectable()
export class UserState {

  constructor(private userService: UserService) { }

  @Selector()
  static isAuthenticated(state: UserStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static isAdmin(state: UserStateModel): boolean {
    return state.isAdmin;
  }

  @Selector()
  static userProfile(state: UserStateModel): IProfile {
    return {
      email: state.email,
      first_name: state.first_name,
      last_name: state.last_name,
      wallet: state.wallet
    };
  }

  @Action(SetUserData)
  SetUserData(ctx: StateContext<UserStateModel>, payload: { userData: UserStateModel }): void {
    ctx.patchState({
      username: payload.userData.username,
      isAuthenticated: payload.userData.isAuthenticated,
      userId: payload.userData.userId,
      isAdmin: payload.userData.isAdmin,
      email: payload.userData.email,
      first_name: payload.userData.first_name,
      last_name: payload.userData.last_name,
      wallet: payload.userData.wallet
    })
  }

  @Action(SetIsAuthenticated)
  SetIsAuthenticated(ctx: StateContext<UserStateModel>, payload: { isAuthenticated: boolean }): void {
    ctx.patchState({
      isAuthenticated: payload.isAuthenticated
    });
  }

  @Action(SetUserId)
  SetUserId(ctx: StateContext<UserStateModel>, payload: { userId: string }): void {
    ctx.patchState({
      userId: payload.userId
    });
  }

  @Action(SetIsAdmin)
  SetIsAdmin(ctx: StateContext<UserStateModel>, payload: { isAdmin: boolean }): void {
    ctx.patchState({
      isAdmin: payload.isAdmin
    });
  }

  @Action(GetProfile)
  GetProfile(ctx: StateContext<UserStateModel>): Observable<IProfile> {
    return this.userService.getuserProfile().pipe(
      tap((profile) => {
        console.log('profile', profile);
        ctx.patchState({
          email: profile.email,
          first_name: profile.first_name,
          last_name: profile.last_name,
          wallet: profile.wallet
        })
      })
    );
  }
}