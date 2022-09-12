import { action, makeObservable, observable } from "mobx";

interface LoginData {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: object;
}

export class LoginStoreImplementation {
  login: LoginData = {
    isLoading: false,
    isAuthenticated: false,
    user: {},
  };

  constructor() {
    makeObservable(this, {
      login: observable,
      loginSucces: action,
    });
  }

  loginSucces(user: object) {
    this.login.isAuthenticated = true;
    this.login.isLoading = false;
    this.login.user = user;
  }
  loginError() {
    this.login.isAuthenticated = false;
    this.login.isLoading = true;
  }
  logout() {
    this.login.isAuthenticated = false;
    this.login.isLoading = false;
    this.login.user = {};
  }
}

export const LoginStore = new LoginStoreImplementation();
