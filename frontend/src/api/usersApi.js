import axios from '../core/axios';

export const UsersApi = {
  async fetchDataOfUsers() {
    const { data } = await axios.get('/users');

    return data;
  },

  async updateDataOfAdminStatus() {
    const { data } = await axios.get('/users/adminStatus');

    return data;
  },

  async updateAccountStatusOfUser(userId) {
    const { data } = await axios.get(`/users/accountStatus/${userId}`);

    return data;
  }
};
