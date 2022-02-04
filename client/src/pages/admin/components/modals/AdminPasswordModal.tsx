import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavMenuItemEnum } from '../../../../types';
import toasty from '../../../../utils/toasty';
import optionApi from '../../redux/api/option.api';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

type TFormValue = {
  password: string;
};

export default function AdminPasswordModal() {
  const { register, handleSubmit, reset } = useForm<TFormValue>();
  const { data } = optionApi.useGetAdminPasswordQuery();
  const [updateAdminPassword] = optionApi.useUpdateAdminPasswordMutation();

  const handlePasswordSubmit = (data: TFormValue) => {
    updateAdminPassword(data)
      .unwrap()
      .then(() => {
        toasty.success('관리자 비밀번호를 변경했습니다');
        reset();
      })
      .catch((e) => {
        const message = e.data.message[0];
        toasty.error(message);
      });
  };
  return (
    <CustomModal
      size="sm"
      className="admin-password-modal"
      navMenuItem={NavMenuItemEnum.AdminPassword}
    >
      <Form onSubmit={handleSubmit(handlePasswordSubmit)}>
        <Modal.Header>관리자 비밀번호</Modal.Header>
        <Modal.Body>
          <Form.Control
            {...register('password', {
              required: true,
            })}
            placeholder={data?.optionValue}
          />
        </Modal.Body>
        <CustomModalFooter>
          <Button type="submit" variant="primary">
            적용
          </Button>
        </CustomModalFooter>
      </Form>
    </CustomModal>
  );
}
