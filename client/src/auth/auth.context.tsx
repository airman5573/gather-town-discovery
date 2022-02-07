import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, User, UserRole } from '../common/types';
import AuthService from './auth.service';
import toasty from '../utils/toasty';
import { ACCESS_TOKEN_KEY } from '../constants';

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<User | undefined>(
    AuthService.getCurrentUser(),
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === UserRole.ADMIN) {
      navigate('/admin');
    } else if (user.role === UserRole.USER) {
      navigate('/user');
    }
  }, [user]);

  const login = async (password: string) => {
    try {
      const accessToken = await AuthService.login(password);
      if (accessToken) {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        const user = AuthService.getCurrentUser();
        setUser(user);
      }
    } catch (e: any) {
      const { message } = e.response.data;
      toasty.error(message);
    }
  };

  const memoedValue = useMemo(
    () => ({
      user,
      login,
      setUser,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
