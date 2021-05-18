import axios from 'axios';
import { clearAuthTokens, getAccessToken } from 'axios-jwt';
import { ENDPOINT_CONSTANTS } from './endpoint.constants';
import { appHistory } from './history.utils';
import {remove} from 'local-storage';

export const axiosInstance = axios.create({
  baseURL: ENDPOINT_CONSTANTS.url,
});

axiosInstance.interceptors.request.use(requestOptions => {
  return {
    ...requestOptions,
    headers: {
      ...requestOptions.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
});

const redirectToLoginOnUnauthorized = response => {
  if (response.response && [401, 405].includes(response.response.status)) {
    clearAuthTokens();
    remove('user');
    appHistory.push('/auth/login');
  }

  throw response
};

axiosInstance.interceptors.response.use(r => r, redirectToLoginOnUnauthorized);