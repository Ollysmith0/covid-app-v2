import axios from 'axios';

const countryApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1/name/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
countryApi.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default countryApi;
