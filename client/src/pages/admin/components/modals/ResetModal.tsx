import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

export default function ResetModal() {
  return (
    <CustomModal navMenuItem={NavMenuItemEnum.Reset}>
      <Modal.Header>초기화</Modal.Header>
      <Modal.Body></Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
