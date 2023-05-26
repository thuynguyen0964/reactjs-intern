import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://reqres.in',
});

customAxios.interceptors.response.use(
  function (response) {
    return response.data ? response?.data : { statusCode: response?.status };
  },
  function (error) {
    return Promise.reject(error);
  }
);

const removeUser = (id) => {
  return customAxios.delete(`/api/users/${id}`);
};

export default customAxios;
export { removeUser };
