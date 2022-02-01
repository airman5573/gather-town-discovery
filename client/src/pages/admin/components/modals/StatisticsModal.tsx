import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';

export default function StatisticsModal() {
  return (
    <CustomModal navMenuItem={NavMenuItemEnum.Statistics}>
      <Modal.Header>최종결과</Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">닫기</Button>
      </Modal.Footer>
    </CustomModal>
  );
}
