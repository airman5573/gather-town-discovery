import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

export default function StatisticsModal() {
  return (
    <CustomModal navMenuItem={NavMenuItemEnum.Statistics}>
      <Modal.Header>최종결과</Modal.Header>
      <Modal.Body></Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
