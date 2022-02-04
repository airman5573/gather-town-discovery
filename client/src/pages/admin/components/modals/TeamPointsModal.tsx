import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

export default function TeamPointsModal() {
  return (
    <CustomModal navMenuItem={NavMenuItemEnum.TeamPoints}>
      <Modal.Header>본부 점수 제공</Modal.Header>
      <Modal.Body></Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
