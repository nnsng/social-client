import authApi from 'api/authApi';
import jwtDecode from 'jwt-decode';
import { AuthResponse, Token } from 'models';
import { NavigateFunction } from 'react-router-dom';
import { TOKEN } from './constants';

type Keys = keyof typeof TOKEN;
type TokenType = typeof TOKEN[Keys];

interface CheckTokenParams {
  type: TokenType;
  token: string;
  navigate?: NavigateFunction;
}

export const checkTokenExpiration = async ({ type, token, navigate }: CheckTokenParams) => {
  if (type === TOKEN.ACTIVE) return;

  const decoded: Token = jwtDecode(token);
  if (decoded.exp >= Date.now() / 1000) return token;

  if (type === TOKEN.REFRESH) return navigate?.('/login');

  try {
    const refreshToken = localStorage.getItem(TOKEN.REFRESH) || '';
    const response = (await authApi.refreshToken(refreshToken)) as unknown as AuthResponse;
    saveToken(response);
    return response.accessToken;
  } catch (error: any) {
    console.log('Failed to check token expiration', error);
  }
};

export const saveToken = (authResponse: AuthResponse) => {
  const { accessToken, refreshToken } = authResponse;

  accessToken && localStorage.setItem(TOKEN.ACCESS, accessToken);
  refreshToken && localStorage.setItem(TOKEN.REFRESH, refreshToken);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN.ACCESS);
  localStorage.removeItem(TOKEN.REFRESH);
};
