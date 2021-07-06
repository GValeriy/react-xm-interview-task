import axios from 'axios';

/* eslint-disable no-console */
export const logServiceErrors = (error, errorInfo?) => console.error(error, errorInfo);

const makeRequest = (baseURL, url, params) => {
  const instance = axios.create({
    baseURL,
  });

  return instance.get(url, {
    method: 'GET',
    params,
    headers: {
      'x-rapidapi-key': 'a4a0d1f839mshfe32a0b91726f9dp11c258jsn8ff15f13fab6',
    },
  }).then((response) => response.data)
    .catch((error) => {
      logServiceErrors(error);
    });
};

export const getPrices = (url = '', params = {}) => {
  const baseURL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2';
  return makeRequest(baseURL, url, params);
};

export const getCompanies = (url = '', params = {}) => {
  const baseURL = 'https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed_json/data/a5bc7580d6176d60ac0b2142ca8d7df6/nasdaq-listed_json.json';
  return makeRequest(baseURL, url, params);
};
