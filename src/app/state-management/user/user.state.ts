import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetIsAdmin, SetIsAuthenticated, SetUserData, SetUserId } from "./user.actions";


export class UserStateModel {
  username: string;
  isAuthenticated: boolean;
  userId: string;
  isAdmin: boolean;
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    username: null,
    isAuthenticated: false,
    userId: null,
    isAdmin: false
  }
})
@Injectable()
export class UserState  {

  @Selector()
  static isAuthenticated(state: UserStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static isAdmin(state: UserStateModel): boolean {
    return state.isAdmin;
  }
  
  @Action(SetUserData)
  SetUserData(ctx: StateContext<UserStateModel>, payload: {userData: UserStateModel}): void {
        ctx.patchState({
          username: payload.userData.username,
          isAuthenticated: payload.userData.isAuthenticated,
          userId: payload.userData.userId,
          isAdmin: payload.userData.isAdmin
        })
  }

  @Action(SetIsAuthenticated)
  SetIsAuthenticated(ctx: StateContext<UserStateModel>, payload: {isAuthenticated: boolean}): void {
    ctx.patchState({
      isAuthenticated: payload.isAuthenticated
    });
  }

  @Action(SetUserId)
  SetUserId(ctx: StateContext<UserStateModel>, payload: {userId: string}): void {
    ctx.patchState({
      userId: payload.userId
    });
  }

  @Action(SetIsAdmin)
  SetIsAdmin(ctx: StateContext<UserStateModel>, payload: {isAdmin: boolean}): void {
    ctx.patchState({
      isAdmin: payload.isAdmin
    });
  }
}