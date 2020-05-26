import Cookies from 'universal-cookie';
import { COOKIES_TOKEN_HEADER_PAYLOAD, COOKIES_TOKEN_SIGNATURE } from '../helpers/constants';

const getCookie = (tokenName: string) => {
  const cookies = new Cookies();
  return cookies.get(tokenName);
};

const setCookieHeaderPayload = (value: string) => {
  const cookies = new Cookies();
  cookies.set(COOKIES_TOKEN_HEADER_PAYLOAD, value, {
    path: '/',
    sameSite: true
    // secure: true // for https
  });
};

const setCookieSignature = (value: string) => {
  const cookies = new Cookies();
  cookies.set(COOKIES_TOKEN_SIGNATURE, value, {
    path: '/',
    sameSite: true
    // secure: true,
    // httpOnly: true // only for backend
  });
};

const removeCookie = (tokenName: string) => {
  const cookies = new Cookies();
  cookies.remove(tokenName);
};

const cookieService = {
  getUserToken: () => {
    const cookie1 = getCookie(COOKIES_TOKEN_HEADER_PAYLOAD);
    const cookie2 = getCookie(COOKIES_TOKEN_SIGNATURE);

    if (!cookie1 || !cookie2) {
      return null;
    }

    return `${cookie1}.${cookie2}`;
  },

  setUserToken: (token: string) => {
    if (!token) {
      throw new Error('Unable to complete login');
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('Unable to complete login');
    }

    const cookie1 = `${parts[0]}.${parts[1]}`;

    setCookieHeaderPayload(cookie1);
    setCookieSignature(parts[2]);
  },

  removeUserToken: () => {
    removeCookie(COOKIES_TOKEN_HEADER_PAYLOAD);
    removeCookie(COOKIES_TOKEN_SIGNATURE);
  }
};

export default cookieService;
