import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { message } from 'antd';

export class ApiService {
  static AxiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache, no-store',
      Pragma: 'no-cache'
    }
  };

  get(
    url: string,
    token?: string,
    showDefaultErrorMsg: boolean = true
  ): Promise<AxiosResponse | AxiosError> {
    const config = getConfig(token);
    return axios.get(url, config).catch(handleError(showDefaultErrorMsg));
  }

  post(
    url: string,
    payload: any,
    token?: string,
    showDefaultErrorMsg: boolean = true
  ): Promise<AxiosResponse | AxiosError> {
    const config = getConfig(token);
    return axios.post(url, payload, config).catch(handleError(showDefaultErrorMsg));
  }

  patch(
    url: string,
    payload: any,
    token?: string,
    showDefaultErrorMsg: boolean = true
  ): Promise<AxiosResponse | AxiosError> {
    const config = getConfig(token);
    return axios.patch(url, payload, config).catch(handleError(showDefaultErrorMsg));
  }

  delete(
    url: string,
    token?: string,
    showDefaultErrorMsg: boolean = true
  ): Promise<AxiosResponse | AxiosError> {
    const config = getConfig(token);
    return axios.delete(url, config).catch(handleError(showDefaultErrorMsg));
  }

  handleRequestError = (e: string) => {
    message.error(e);
    return Promise.reject(e);
  };
}

const getConfig = (token?: string) => {
  const config = { ...ApiService.AxiosConfig };
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const handleError = (showDefaultErrorMsg: boolean) => (e: AxiosError) => {
  if (showDefaultErrorMsg) {
    return Promise.reject(defaultErrorMessage(e));
  }
  const msg = e.response?.data?.error ?? defaultErrorMessage(e);
  return Promise.reject(msg);
};

export const defaultErrorMessage = (error: AxiosError): string => {
  let errorMsg = 'Server error';
  if (error.code === 'ECONNABORTED') {
    errorMsg = 'Request timeout';
  } else if (error.response?.status === 400) {
    errorMsg = 'Invalid data';
  } else if (error.response?.status === 401) {
    errorMsg = 'Unauthorised';
  } else if (error.response?.status === 404) {
    errorMsg = 'Not found';
  }
  return errorMsg;
};
