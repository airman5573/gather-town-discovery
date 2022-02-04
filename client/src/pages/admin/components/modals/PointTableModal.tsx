import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

export default function PointTableModal() {
  return (
    <CustomModal
      className="point-table-modal"
      navMenuItem={NavMenuItemEnum.PointTable}
    >
      <Modal.Header>점수배정표</Modal.Header>
      <Modal.Body></Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
