import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/auth.hooks';
import { UserRole } from '../../common/types';
import toasty from '../../utils/toasty';

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

  return <div className="user-page">THIS IS USER PAGE</div>;
}
