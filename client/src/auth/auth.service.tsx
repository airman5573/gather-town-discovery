import { ACCESS_TOKEN_KEY } from '../constants';
import { User } from '../common/types';
import { apiRequest } from '../utils/axios-jwt';
import jwt_decode from 'jwt-decode';

const AuthService = {
  login: async (password: string): Promise<string> => {
    try {
      const {
        data: { accessToken },
      } = await apiRequest({
        method: 'POST',
        url: 'auth/login',
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
