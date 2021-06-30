import axios from '../core/axios';

export const AuthApi = {
  async signIn(postData) {
    const { data } = await axios.post('/auth/sign-in', {
      username: postData.email,
      password: postData.password
    });

    return data;
  },

  async signUp(postData) {
    const { data } = await axios.post('/auth/sign-up', {
      email: postData.email,
      username: postData.username,
      fullName: postData.fullName,
      password: postData.password,
      password2: postData.password2
    });

    return data;
  },

  async refresh() {
    const { data } = await axios.get('/auth/refresh');

    return data;
  }
};
