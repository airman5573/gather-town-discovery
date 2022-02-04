import { Modal, Button } from 'react-bootstrap';
import { useAppDispatch } from '../redux';
import { updateActiveNavMenuItem } from '../redux/features/modal-control.slice';

export default function CustomModalFooter({
  children,
}: {
  children?: JSX.Element;
}) {
  const dispatch = useAppDispatch();
  return (
    <Modal.Footer>
      {children}
      <Button
        variant="secondary"
        onClick={() => {
          dispatch(updateActiveNavMenuItem(null));
        }}
      >
        닫기
      </Button>
    </Modal.Footer>
  );
}
