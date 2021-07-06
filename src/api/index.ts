import axios from 'axios';
import { init, send } from 'emailjs-com';
import apiConfig from './config';

const { apiStockUrl, apiListingsUrl, apiLocalhostUrl } = apiConfig;

/* eslint-disable no-console */
export const logServiceErrors = (error, errorInfo?) => console.error(error, errorInfo);

const makeRequest = (baseURL, url, params?) => {
  const instance = axios.create({
    baseURL,
  });

  return instance.get(url, {
    method: 'GET',
    params,
    headers: {
      'x-rapidapi-key': localStorage.getItem('apiAccessToken'),
    },
  }).then((response) => response.data)
    .catch((error) => {
      logServiceErrors(error);
    });
};

export const getPrices = (url = '', params = {}) => makeRequest(apiStockUrl, url, params);

export const getCompanies = (url = '', params = {}) => makeRequest(apiListingsUrl, url, params);

export const sendEmail = (config, templateParams) => {
  init(config.userId);
  send(
    config.serviceId,
    config.templateId,
    templateParams,
  )
    .catch((error) => {
      logServiceErrors(error);
    });
};

export const getApiKeys = async () => {
  const data = await makeRequest(apiLocalhostUrl, '/api-keys');
  localStorage.setItem('apiAccessToken', data?.apiAccessToken);
  return data;
};
