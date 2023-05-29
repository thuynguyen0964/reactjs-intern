import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://reqres.in',
});

customAxios.interceptors.response.use(
  function (response) {
    return response.data ? response?.data : { statusCode: response?.status };
  },
  function (error) {
    const reponseErr = {};
    if (error.response) {
      reponseErr.data = error.response.data;
      reponseErr.status = error.response.status;
      reponseErr.headers = error.response.header;
    } else if (error.request) {
      console.log(error.request);
    }
    return reponseErr;
  }
);

const removeUser = (id) => {
  return customAxios.delete(`/api/users/${id}`);
};

const loginUser = (email, password) => {
  return customAxios.post(`/api/login`, { email, password });
};

export default customAxios;
export { removeUser, loginUser };
