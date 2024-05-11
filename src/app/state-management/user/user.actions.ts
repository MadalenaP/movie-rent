import { UserStateModel } from "./user.state";

export class SetUserData {
  static readonly type = '[User] Set user data';
  constructor(public userData: UserStateModel) {}
}

export class SetIsAuthenticated {
  static readonly type = '[User] Set isAuthenticated';
  constructor(public isAuthenticated: boolean) {}
}

export class SetUserId {
  static readonly type = '[User] Set User Id';
  constructor(public userId: string) {}
}

export class SetIsAdmin {
  static readonly type = '[User] Set isAdmin';
  constructor(public isAdmin: boolean) {}
}

export class GetProfile {
  static readonly type = '[User] Get profile';
}