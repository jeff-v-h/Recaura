import axios, { AxiosResponse, AxiosError } from 'axios';

export const get = (url: string, showDefaultErrorMsg: boolean = true): Promise<AxiosResponse | AxiosError> => {
  return axios.get(url, AxiosConfig).catch((e: AxiosError) => {
    if (showDefaultErrorMsg) {
      const msg = defaultErrorMessage(e);
      return Promise.reject(msg);
    }
    return Promise.reject(e);
  });
};

export const post = (
  url: string,
  payload: any,
  showDefaultErrorMsg: boolean = true
): Promise<AxiosResponse | AxiosError> => {
  // const newPayload = AxisPayload(payload);
  return axios.post(url, payload, AxiosConfig).catch((e: AxiosError) => {
    if (showDefaultErrorMsg) {
      const msg = defaultErrorMessage(e);
      return Promise.reject(msg);
    }
    return Promise.reject(e);
  });
};

export const patch = (
  url: string,
  payload: any,
  showDefaultErrorMsg: boolean = true
): Promise<AxiosResponse | AxiosError> => {
  return axios.patch(url, payload, AxiosConfig).catch((e: AxiosError) => {
    if (showDefaultErrorMsg) {
      const msg = defaultErrorMessage(e);
      return Promise.reject(msg);
    }
    return Promise.reject(e);
  });
};

// when do the post directly, asp.net core controller is using the low camera case
const AxiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache, no-store',
    Pragma: 'no-cache'
  }
  // timeout: 30000
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
