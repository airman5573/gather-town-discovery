/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/auth.hooks';
import { UserRole } from '../../common/types';
import toasty from '../../utils/toasty';
import Board from './components/board/Board';
import { store } from './redux';

export default function UserPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // user가 없거나, 있는데 USER가 아닌 경우
    if (!user || (user && user.role !== UserRole.USER)) {
      toasty.error('해당 페이지에 접근할 수 없습니다');
      navigate('/login', { replace: true });
    }
  }, [user]);
  return (
    <Provider store={store}>
      <div className="admin-page">
        <Board></Board>
      </div>
    </Provider>
  );
}
