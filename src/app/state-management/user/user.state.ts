import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { SetUserData } from "./user.actions";


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

  @Action(SetUserData)
  SetUserData(ctx: StateContext<UserStateModel>, payload: {userData: UserStateModel}): void {
        ctx.patchState({
          username: payload.userData.username,
          isAuthenticated: payload.userData.isAuthenticated,
          userId: payload.userData.userId,
          isAdmin: payload.userData.isAdmin
        })
  }
  
}