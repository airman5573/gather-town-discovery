import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AuthService from '../../../auth/auth.service';
import { User } from '../../../common/types';
import jwt_decode from 'jwt-decode';
import toasty from '../../../utils/toasty';

type TProps = {
  isModalActive: boolean;
  onLogin: (user: User, accessToken: string) => Promise<void>;
  handleClose: () => void;
};

type TFormValue = {
  teamPassword: string;
};

export default function TeamPasswordModal({
  onLogin,
  handleClose,
  isModalActive,
}: TProps) {
  const { register, handleSubmit } = useForm<TFormValue>();
  const [show, setShow] = useState<boolean>(isModalActive);
  useEffect(() => {
    setShow(isModalActive);
  }, [isModalActive]);
  const handlePasswordSubmit = async ({ teamPassword }: TFormValue) => {
    try {
      const accessToken = await AuthService.login(teamPassword);
      // 여기서 이걸 해줘야~ upload가 문제없이 이뤄진다 이거야~
      const user = jwt_decode<User>(accessToken);
      onLogin(user, accessToken);
    } catch (e: any) {
      console.dir(e);
      toasty.error(e.response.data.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Form onSubmit={handleSubmit(handlePasswordSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>팀 비밀번호 입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            {...register('teamPassword', {
              required: true,
            })}
            placeholder="팀 비밀번호"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button type="submit" variant="primary">
            확인
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
