import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';

export default function PuzzleSettingModal() {
  return (
    <CustomModal navMenuItem={NavMenuItemEnum.PuzzleSetting}>
      <Modal.Header>구역설정</Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">닫기</Button>
      </Modal.Footer>
    </CustomModal>
  );
}
