import { Button, Modal } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

export default function PuzzleSettingModal() {
  return (
    <CustomModal
      className="puzzle-setting-modal"
      navMenuItem={NavMenuItemEnum.PuzzleSetting}
    >
      <Modal.Header>구역설정</Modal.Header>
      <Modal.Body></Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
