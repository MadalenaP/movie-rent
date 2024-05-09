import { ILoginData } from "../../interfaces/ILoginData";

export class Login {
  static readonly type = '[User] Login';
  constructor(public loginData: ILoginData) {}
}