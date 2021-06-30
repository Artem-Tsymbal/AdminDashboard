import { makeAutoObservable } from 'mobx';
import { AuthApi } from '../api/authApi';
import { UsersApi } from '../api/usersApi';

class AuthStore {
  isAuthed = false;

  dataOfCurrentUser = {};

  constructor() {
    makeAutoObservable(this);
  }

  setDataOfAuthStatus(isAuthed) {
    this.isAuthed = isAuthed;
  }

  setDataOfCurrentUser(user) {
    this.dataOfCurrentUser = user;
  }

  async fetchSignUpRequest(email, username, password) {
    try {
      const { data } = await AuthApi.signUp(email, username, password);

      window.localStorage.setItem('token', data.token);
      this.setDataOfCurrentUser(data.user);
      this.setDataOfAuthStatus(true);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async fetchSignInRequest(email, password) {
    try {
      const { data } = await AuthApi.signIn({ email, password });

      window.localStorage.setItem('token', data.token);
      this.setDataOfCurrentUser(data.user);
      this.setDataOfAuthStatus(true);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchSignOutRequest() {
    try {
      window.localStorage.removeItem('token');
      this.setDataOfCurrentUser({});
      this.setDataOfAuthStatus(false);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async verifyMeRequest() {
    try {
      const { data } = await AuthApi.refresh();

      window.localStorage.setItem('token', data.token);
      this.setDataOfCurrentUser(data.user);
      this.setDataOfAuthStatus(true);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async updateAdminStatusOfUser() {
    try {
      const { data } = await UsersApi.updateDataOfAdminStatus();

      this.setDataOfCurrentUser(data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
}

export default AuthStore;
