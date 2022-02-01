import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';

export default function ResetModal() {
  return (
    <CustomModal navMenuItem={NavMenuItemEnum.Reset}>
      <Modal.Header>초기화</Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">닫기</Button>
      </Modal.Footer>
    </CustomModal>
  );
}
