import { UserStateModel } from "./user.state";

export class SetUserData {
  static readonly type = '[User] Set user data';
  constructor(public userData: UserStateModel) {}
}