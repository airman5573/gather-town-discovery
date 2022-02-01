import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';

export default function UploadModal() {
  return (
    <CustomModal navMenuItem={NavMenuItemEnum.Upload}>
      <Modal.Header>이미지 설정</Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">닫기</Button>
      </Modal.Footer>
    </CustomModal>
  );
}
