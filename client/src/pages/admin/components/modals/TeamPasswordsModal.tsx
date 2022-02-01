import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavMenuItemEnum, TeamPassword } from '../../../../types';
import toasty from '../../../../utils/toasty';
import teamPasswordsApi from '../../redux/api/team-passwords.api';
import CustomModal from '../CustomModal';

type FormValues = Array<TeamPassword>;

export default function TeamPasswordsModal() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const {
    data: teamPasswords,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = teamPasswordsApi.useGetAllQuery();

  const [updateTeamPasswords] = teamPasswordsApi.useUpdateMutation();
  const onSubmit = (data: { [team: number]: TeamPassword }) => {
    const teamPasswordValues = Object.values(data)
      .filter(({ password }) => password.length > 0)
      .map(({ team, password }) => {
        return { team, password };
      });
    // empty check
    if (teamPasswordValues.length === 0) {
      toasty.error('팀 비밀번호를 입력해주세요');
      return;
    }

    const errorFields = teamPasswordValues.filter(({ team, password }) => {
      const space = /\s/gi;
      const sc = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
      if (space.test(password) || sc.test(password)) {
        setError(`${team}.password` as const, {
          type: 'pattern',
          message: '비밀번호에 공백 혹은 특수문자가 포함되어있습니다',
        });
        return true;
      }
      return false;
    });

    if (errorFields.length > 0) {
      toasty.error('팀 비밀번호 설정에 오류가 있습니다');
      return;
    }

    const _teamPasswords = teamPasswords!.map(({ team, password }) => {
      let p = password;
      for (let i = 0; i < teamPasswordValues.length; i += 1) {
        if (team === teamPasswordValues[i].team) {
          p = teamPasswordValues[i].password;
          break;
        }
      }
      return { team, password: p };
    });

    const isDuplicated = _teamPasswords.some(({ team, password }, index) => {
      return _teamPasswords.some(({ team: _team, password: _password }) => {
        if (team !== _team && password === _password) {
          setError(`${index}.password` as const, {
            type: 'duplication',
            message: '중복된 비밀번호가 있습니다',
          });
          return true;
        }
        return false;
      });
    });
    if (isDuplicated) {
      toasty.error('팀 비밀번호 설정에 오류가 있습니다');
      return;
    }

    updateTeamPasswords(_teamPasswords)
      .unwrap()
      .then(() => {
        toasty.success('비밀번호를 변경하였습니다');
        reset();
      });
  };

  return (
    <CustomModal size="lg" navMenuItem={NavMenuItemEnum.TeamPasswords}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>팀 비밀번호 설정</Modal.Header>
        <Modal.Body>
          <Row>
            {teamPasswords?.map(({ team, password }) => {
              return (
                <Col sm="3" key={team} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>{team}</InputGroup.Text>
                    <FormControl
                      type="hidden"
                      value={team}
                      {...register(`${team - 1}.team` as const, {
                        valueAsNumber: true,
                      })}
                    />
                    <FormControl
                      {...register(`${team - 1}.password` as const)}
                      placeholder={password}
                      isInvalid={errors.hasOwnProperty(team - 1)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.hasOwnProperty(team - 1)
                        ? errors[team - 1].password?.message
                        : ''}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              );
            })}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            적용
          </Button>
          <Button variant="secondary">닫기</Button>
        </Modal.Footer>
      </Form>
    </CustomModal>
  );
}
