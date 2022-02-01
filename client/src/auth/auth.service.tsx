import { ACCESS_TOKEN_KEY, API_URL } from '../constants';
import { User } from '../types';
import { apiRequest } from '../utils/axios-jwt';
import jwt_decode from 'jwt-decode';

const AuthService = {
  login: async (password: string): Promise<string | undefined> => {
    try {
      const {
        data: { accessToken },
      } = await apiRequest({
        ...API_URL.AUTH.LOGIN,
        data: { password },
      });
      return accessToken;
    } catch (e: any) {
      throw e;
    }
  },
  getCurrentUser: (): User | undefined => {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
      return undefined;
    }
    return jwt_decode<User>(accessToken);
  },
};

export default AuthService;
