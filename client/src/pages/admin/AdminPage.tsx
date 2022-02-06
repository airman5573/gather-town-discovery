/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import useAuth from '../../auth/auth.hooks';
import { UserRole } from '../../common/types';
import toasty from '../../utils/toasty';
import Modals from './components/modals';
import { store } from './redux';
import './style.scss';
import { css } from '@emotion/react';
import Board from './components/board/Board';

export default function AdminPage() {
  const { user } = useAuth();
  useEffect(() => {
    // user가 없거나, 있는데 ADMIN이 아닌 경우
    if (!user || (user && user.role !== UserRole.ADMIN)) {
      toasty.error('해당 페이지에 접근할 수 없습니다');
    }
  }, [user]);

  return (
    <Provider store={store}>
      <div className="admin-page">
        <Board></Board>
        <Modals></Modals>
      </div>
    </Provider>
  );
}
