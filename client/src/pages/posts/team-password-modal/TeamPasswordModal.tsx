import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AuthService from '../../../auth/auth.service';
import { User, YesOrNo } from '../../../common/types';
import jwt_decode from 'jwt-decode';
import toasty from '../../../utils/toasty';
import timerApi from '../../admin/redux/api/timer.api';

type TProps = {
  isModalActive: boolean;
  onLogin: (team: number, accessToken: string) => void;
  handleClose?: () => void;
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
  const [trigger] = timerApi.endpoints.get.useLazyQuery();
  useEffect(() => {
    setShow(isModalActive);
  }, [isModalActive]);
  const handlePasswordSubmit = async ({ teamPassword }: TFormValue) => {
    try {
      const accessToken = await AuthService.login(teamPassword);
      // 여기서 이걸 해줘야~ upload가 문제없이 이뤄진다 이거야~
      const user = jwt_decode<User>(accessToken);
      if (!user.team) return;
      const { team } = user;
      trigger(team)
        .unwrap()
        .then((res) => {
          const { canUpload } = res;
          if (canUpload === YesOrNo.NO) {
            toasty.error('본부로 먼저 돌아가 주세요!');
            return;
          }
          onLogin(team, accessToken);
        });
    } catch (e: any) {
      console.dir(e);
      toasty.error(e.response.data.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Form onSubmit={handleSubmit(handlePasswordSubmit)}>
        <Modal.Header>
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
          <Button type="submit" variant="primary">
            확인
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
