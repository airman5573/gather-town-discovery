import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';

export default function TeamPointsModal() {
  return (
    <CustomModal navMenuItem={NavMenuItemEnum.TeamPoints}>
      <Modal.Header>본부 점수 제공</Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="primary">적용</Button>
        <Button variant="secondary">닫기</Button>
      </Modal.Footer>
    </CustomModal>
  );
}
