import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toasty from '../../../../utils/toasty';
import resetApi from '../../redux/api/reset.api';
import { NavMenuItemEnum } from '../../types';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

type TFormValue = {
  resetCheck: string;
};

export default function ResetModal() {
  const { register, handleSubmit, reset } = useForm<TFormValue>();
  const [allReset] = resetApi.useResetMutation();
  const handlePasswordSubmit = ({ resetCheck }: TFormValue) => {
    reset();
    if (resetCheck !== 'reset') {
      toasty.error('reset을 정확히 입력해 주세요');
      return;
    }
    allReset()
      .unwrap()
      .then((data) => {
        toasty.success('초기화 성공');
      })
      .catch((e) => {
        console.error(e);
        const message = e.data.message[0];
        toasty.error(message);
      });
  };
  return (
    <CustomModal
      size="sm"
      className="reset-modal"
      navMenuItem={NavMenuItemEnum.Reset}
    >
      <Form onSubmit={handleSubmit(handlePasswordSubmit)}>
        <Modal.Header>관리자 비밀번호</Modal.Header>
        <Modal.Body>
          <Form.Control
            {...register('resetCheck', {
              required: true,
            })}
            placeholder="reset"
          />
        </Modal.Body>
        <CustomModalFooter>
          <Button type="submit" variant="primary">
            초기화
          </Button>
        </CustomModalFooter>
      </Form>
    </CustomModal>
  );
}
