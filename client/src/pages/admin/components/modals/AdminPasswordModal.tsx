import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';

export default function AdminPasswordModal() {
  return (
    <CustomModal navMenuItem={NavMenuItemEnum.AdminPassword}>
      <Modal.Header>관리자 비밀번호</Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="primary">적용</Button>
        <Button variant="secondary">닫기</Button>
      </Modal.Footer>
    </CustomModal>
  );
}
