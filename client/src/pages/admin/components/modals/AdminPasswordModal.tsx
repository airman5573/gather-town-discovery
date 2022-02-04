import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

export default function AdminPasswordModal() {
  return (
    <CustomModal
      className="admin-password-modal"
      navMenuItem={NavMenuItemEnum.AdminPassword}
    >
      <Modal.Header>관리자 비밀번호</Modal.Header>
      <Modal.Body></Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
