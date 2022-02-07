import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../types';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

export default function PuzzleStatusModal() {
  return (
    <CustomModal
      className="puzzle-status-modal"
      navMenuItem={NavMenuItemEnum.PuzzleStatus}
    >
      <Modal.Header>구역점유현황</Modal.Header>
      <Modal.Body></Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
