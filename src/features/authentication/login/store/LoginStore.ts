import { action, makeObservable, observable } from "mobx";

interface LoginData {
  loading: boolean;
  authenticated: boolean;
  user: object;
  // {
  //   email: string;
  //   uid: string;
  //   displayName: string;
  //   photoUrl: string;
  // };
}

export class LoginStoreImplementation {
  login: LoginData = {
    loading: false,
    authenticated: false,
    user: {},
  };

  constructor() {
    makeObservable(this, {
      login: observable,
      loginSucces: action,
    });
  }

  loginSucces(user: object) {
    this.login.authenticated = true;
    this.login.loading = false;
    this.login.user = user;
  }
  loginError() {
    this.login.authenticated = false;
    this.login.loading = true;
  }
  logout() {
    this.login.authenticated = false;
    this.login.loading = false;
    this.login.user = {};
  }
}

export const LoginStore = new LoginStoreImplementation();
