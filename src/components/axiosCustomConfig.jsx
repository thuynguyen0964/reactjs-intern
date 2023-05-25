import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://reqres.in',
});

customAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default customAxios;
