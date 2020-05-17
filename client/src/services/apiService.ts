import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { Api, OmitId, QueryStringValues } from './api';
// import { makeQueryString, makeKeyValuePairs } from 'App/utils/queryStringHelper';

export class ApiService {
  static AxiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache, no-store',
      Pragma: 'no-cache'
    }
  };

  get(url: string, showDefaultErrorMsg: boolean = true): Promise<AxiosResponse | AxiosError> {
    return axios.get(url, ApiService.AxiosConfig).catch((e: AxiosError) => {
      if (showDefaultErrorMsg) {
        const msg = defaultErrorMessage(e);
        return Promise.reject(msg);
      }
      return Promise.reject(e);
    });
  }

  post(
    url: string,
    payload: any,
    showDefaultErrorMsg: boolean = true
  ): Promise<AxiosResponse | AxiosError> {
    return axios.post(url, payload, ApiService.AxiosConfig).catch((e: AxiosError) => {
      if (showDefaultErrorMsg) {
        const msg = defaultErrorMessage(e);
        return Promise.reject(msg);
      }
      return Promise.reject(e);
    });
  }

  patch(
    url: string,
    payload: any,
    showDefaultErrorMsg: boolean = true
  ): Promise<AxiosResponse | AxiosError> {
    return axios.patch(url, payload, ApiService.AxiosConfig).catch((e: AxiosError) => {
      if (showDefaultErrorMsg) {
        const msg = defaultErrorMessage(e);
        return Promise.reject(msg);
      }
      return Promise.reject(e);
    });
  }

  delete(url: string, showDefaultErrorMsg: boolean = true): Promise<AxiosResponse | AxiosError> {
    return axios.delete(url, ApiService.AxiosConfig).catch((e: AxiosError) => {
      if (showDefaultErrorMsg) {
        const msg = defaultErrorMessage(e);
        return Promise.reject(msg);
      }
      return Promise.reject(e);
    });
  }
}

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
