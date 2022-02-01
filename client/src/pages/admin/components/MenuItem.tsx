import classNames from 'classnames';
import { MenuItemProps } from '../../../types';
import { useAppDispatch, useAppSelector } from '../redux';
import { updateActiveNavMenuItem } from '../redux/features/modal-control.slice';

export default function MenuItem(props: MenuItemProps) {
  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  const dispatch = useAppDispatch();
  const className = classNames('menu-item', `menu-item--${props.className}`, {
    'is-active': props.className === activeNavMenuItem,
  });
  const handleClick = () => {
    dispatch(updateActiveNavMenuItem(props.className));
  };
  return (
    <li className={className}>
      <button onClick={handleClick}>
        {props.label}
        <div className="ripple js-ripple">
          <span className="ripple__circle"></span>
        </div>
      </button>
    </li>
  );
}
