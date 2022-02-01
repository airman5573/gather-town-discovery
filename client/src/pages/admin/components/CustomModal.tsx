import { Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../types';
import { useAppDispatch, useAppSelector } from '../redux';
import { updateActiveNavMenuItem } from '../redux/features/modal-control.slice';

type Props = {
  size?: 'sm' | 'lg' | 'xl';
  navMenuItem: NavMenuItemEnum;
  children: JSX.Element | JSX.Element[];
};

export default function CustomModal({ size, navMenuItem, children }: Props) {
  const dispatch = useAppDispatch();
  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  const show = activeNavMenuItem === navMenuItem;
  const handleHide = () => dispatch(updateActiveNavMenuItem(null));
  return (
    <Modal size={size ? size : 'lg'} show={show} onHide={handleHide}>
      {children}
    </Modal>
  );
}