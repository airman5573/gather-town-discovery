import { Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux';
import { updateActiveNavMenuItem } from '../redux/features/modal-control.slice';
import { NavMenuItemEnum } from '../types';

type Props = {
  className: string;
  size?: 'sm' | 'lg' | 'xl';
  navMenuItem: NavMenuItemEnum;
  children: JSX.Element | JSX.Element[];
};

export default function CustomModal({
  className,
  size,
  navMenuItem,
  children,
}: Props) {
  const dispatch = useAppDispatch();
  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  const show = activeNavMenuItem === navMenuItem;
  const handleHide = () => dispatch(updateActiveNavMenuItem(null));
  return (
    <Modal
      className={className}
      size={size ? size : 'lg'}
      show={show}
      onHide={handleHide}
    >
      {children}
    </Modal>
  );
}
