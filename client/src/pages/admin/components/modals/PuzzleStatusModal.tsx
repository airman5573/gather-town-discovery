import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';

export default function PuzzleStatusModal() {
  return (
    <CustomModal navMenuItem={NavMenuItemEnum.PuzzleStatus}>
      <Modal.Header>구역점유현황</Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">닫기</Button>
      </Modal.Footer>
    </CustomModal>
  );
}
