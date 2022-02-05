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
import Board from '../../common/components/board/Board';
import { NavMenuItemEnum } from './types';

const adminPageStyle = css`
  display: flex;
`;

export default function AdminPage() {
  const { user } = useAuth();
  const menuItems = [
    { label: '팀 비밀번호', menuItemClassName: NavMenuItemEnum.TeamPassword },
    { label: '타이머', menuItemClassName: NavMenuItemEnum.Timer },
    { label: '이미지설정', menuItemClassName: NavMenuItemEnum.Upload },
    { label: '구역설정', menuItemClassName: NavMenuItemEnum.PuzzleSetting },
    { label: '구역점유현황', menuItemClassName: NavMenuItemEnum.PuzzleStatus },
    { label: '본부 점수 제공', menuItemClassName: NavMenuItemEnum.TeamPoint },
    { label: '최종결과', menuItemClassName: NavMenuItemEnum.Statistics },
    { label: '점수배정표', menuItemClassName: NavMenuItemEnum.PointTable },
    {
      label: '관리자 비밀번호',
      menuItemClassName: NavMenuItemEnum.AdminPassword,
    },
    { label: '초기화', menuItemClassName: NavMenuItemEnum.Reset },
  ];

  useEffect(() => {
    // user가 없거나, 있는데 ADMIN이 아닌 경우
    if (!user || (user && user.role !== UserRole.ADMIN)) {
      toasty.error('해당 페이지에 접근할 수 없습니다');
    }
  }, [user]);

  return (
    <Provider store={store}>
      <div className="admin-page" css={adminPageStyle}>
        <Board menuItems={menuItems}></Board>
        <Modals></Modals>
      </div>
    </Provider>
  );
}
