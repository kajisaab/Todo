import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/';

export const authAPI = (
  authType: string,
  body: object,
  onSuccess: Function,
  onFailure: Function
) => {
  axios
    .post(`auth/${authType}`, body)
    .then((res) => onSuccess(res))
    .catch((err) => onFailure(err));
};
