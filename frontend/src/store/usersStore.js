import { makeAutoObservable, toJS } from 'mobx';
import { UsersApi } from '../api/usersApi';

class UsersStore {
  usersData = [];

  constructor() {
    makeAutoObservable(this);
  }

  setDataOfUsers(users) {
    this.usersData = users;
  }

  setDataOfAccountStatus(userId, activeStatus) {
    const newUsers = toJS(this.usersData).map((user) =>
      user._id === userId ? { ...user, isActive: activeStatus } : user
    );

    this.setDataOfUsers(newUsers);
  }

  async updateAccountStatusOfUser(userId) {
    try {
      const { data } = await UsersApi.updateAccountStatusOfUser(userId);

      this.setDataOfAccountStatus(userId, data.isActive);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async fetchDataOfUsersRequest() {
    try {
      const { data } = await UsersApi.fetchDataOfUsers();

      this.setDataOfUsers(data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
}

export default UsersStore;
