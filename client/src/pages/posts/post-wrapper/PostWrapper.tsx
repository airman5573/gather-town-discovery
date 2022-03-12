/** @jsxImportSource @emotion/react */
import TeamPasswordModal from '../team-password-modal/TeamPasswordModal';
import { login } from '../redux/features/login.slice';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux';

type Props = {
  children: JSX.Element | JSX.Element[] | undefined;
};

export default function PostWrapper(props: Props) {
  const { team, token } = useSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();
  const isShow = !(team && token);
  const handleLogin = (team: number, token: string) => {
    dispatch(login({ team, token }));
  };

  return (
    <>
      <TeamPasswordModal isModalActive={isShow} onLogin={handleLogin} />
      {!isShow && props.children}
    </>
  );
}
