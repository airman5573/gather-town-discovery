/** @jsxImportSource @emotion/react */
import classNames from 'classnames';
import { Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../pages/admin/redux';
import { updateActiveNavMenuItem } from '../../../pages/admin/redux/features/modal-control.slice';
import { mainStyle, menuItemStyle, sidebarStyle } from './board.style';

type MenuItemProps<TClassNameEnum> = {
  menuItemClassName: TClassNameEnum;
  label: string;
};

type BoardProps<TClassNameEnum> = {
  menuItems: Array<MenuItemProps<TClassNameEnum>>;
};

function MenuItem<TClassNameEnum>({
  label,
  menuItemClassName,
}: MenuItemProps<TClassNameEnum>) {
  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  const dispatch = useAppDispatch();
  const className = classNames({
    'is-active': menuItemClassName === activeNavMenuItem,
  });
  const handleClick = () => {
    dispatch(updateActiveNavMenuItem(menuItemClassName));
  };
  return (
    <li className={className} css={menuItemStyle}>
      <button onClick={handleClick}>
        {label}
        <div className="ripple js-ripple">
          <span className="ripple__circle"></span>
        </div>
      </button>
    </li>
  );
}

export default function Board<MenuType>({ menuItems }: BoardProps<MenuType>) {
  return (
    <Row>
      <div className="board">
        <div className="sidebar" css={sidebarStyle}>
          <ul className="nav-menu list-unstyled">
            {menuItems.map(({ menuItemClassName, label }) => {
              return (
                <MenuItem
                  menuItemClassName={menuItemClassName}
                  label={label}
                  key={label}
                ></MenuItem>
              );
            })}
          </ul>
        </div>
        <div className="main" css={mainStyle}></div>
      </div>
    </Row>
  );
}
