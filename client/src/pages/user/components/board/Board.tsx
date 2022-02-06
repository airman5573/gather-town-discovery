/** @jsxImportSource @emotion/react */
import { skipToken } from '@reduxjs/toolkit/dist/query';
import classNames from 'classnames';
import { Row } from 'react-bootstrap';
import useAuth from '../../../../auth/auth.hooks';
import { NavMenuItem } from '../../../../common/components/NavMenuItem/NavMenuItem';
import optionApi from '../../../admin/redux/api/option.api';
import timerApi from '../../../admin/redux/api/timer.api';
import { useAppDispatch, useAppSelector } from '../../redux';
import { updateActiveNavMenuItem } from '../../redux/features/page-control.slice';
import { NavMenuItemEnum } from '../../types';
import Timer from '../timer/Timer';
import TimerContainer from '../timer/TimerContainer';
import { boardStyle, mainStyle, sidebarStyle } from './style';

type MenuItemProps = {
  menuItemClassName: NavMenuItemEnum;
  label: string;
};

function MenuItemContainer({ label, menuItemClassName }: MenuItemProps) {
  const { activeNavMenuItem } = useAppSelector((state) => state.pageControl);
  const dispatch = useAppDispatch();
  const className = classNames({
    'is-active': menuItemClassName === activeNavMenuItem,
  });
  const handleClick = () => {
    dispatch(updateActiveNavMenuItem(menuItemClassName));
  };
  return (
    <NavMenuItem
      label={label}
      className={className}
      handleClick={handleClick}
    />
  );
}

export default function Board() {
  const menuItems = [
    { label: '전체지도', menuItemClassName: NavMenuItemEnum.Map },
    { label: '점수', menuItemClassName: NavMenuItemEnum.Point },
    { label: '구역오픈', menuItemClassName: NavMenuItemEnum.Puzzle },
    { label: '업로드', menuItemClassName: NavMenuItemEnum.Upload },
  ];

  return (
    <Row>
      <div className="board" css={boardStyle}>
        <TimerContainer />
        <div className="sidebar" css={sidebarStyle}>
          <ul className="nav-menu list-unstyled">
            {menuItems.map(({ menuItemClassName, label }) => {
              return (
                <MenuItemContainer
                  label={label}
                  menuItemClassName={menuItemClassName}
                  key={menuItemClassName}
                />
              );
            })}
          </ul>
        </div>
        <div className="main" css={mainStyle}></div>
      </div>
    </Row>
  );
}
