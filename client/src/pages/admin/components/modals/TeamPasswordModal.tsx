/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from 'react';
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
import { TeamPassword } from '../../../../common/types';
import toasty from '../../../../utils/toasty';
import { useAppSelector } from '../../redux';
import teamPasswordsApi from '../../redux/api/team-password.api';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';
import { css } from '@emotion/react';
import { NavMenuItemEnum } from '../../types';
import optionApi from '../../redux/api/option.api';

const style = css`
  color: hotpink;
  margin-right: 100px;
`;

type FormValues = Array<TeamPassword>;

export default function TeamPasswordModal() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // get teamPasswords
  const teamPasswordsObj = teamPasswordsApi.useGetAllQuery();
  const teamPasswords = teamPasswordsObj.data;

  // update teamPasswords
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

  // get teamCount
  const teamCountObj = optionApi.useGetTeamCountQuery();
  const teamCount = teamCountObj.data?.optionValue || 0;

  // update teamCount
  const [updateTeamCount] = optionApi.useUpdateTeamCountMutation();
  const teamCountInput = useRef<HTMLInputElement>(null);
  const handleTeamCountSubmit = () => {
    if (!teamCountInput.current) {
      return;
    }
    const value = teamCountInput.current.value;
    if (!value) {
      toasty.error('전체팀수를 다시 확인해주세요');
      teamCountInput.current.value = '';
      return;
    }
    const teamCount = parseInt(value);
    updateTeamCount(teamCount)
      .unwrap()
      .then((data) => {
        toasty.success('전체팀수를 설정했습니다');
        teamPasswordsObj.refetch();
      })
      .catch((e) => {
        const message = e.data.message[0];
        toasty.error(message);
      });
    teamCountInput.current.value = '';
  };

  // refetch when modal open
  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  useEffect(() => {
    teamCountObj.refetch();
    teamPasswordsObj.refetch();
  }, [activeNavMenuItem]);

  return (
    <CustomModal
      className="team-password-modal"
      size="lg"
      navMenuItem={NavMenuItemEnum.TeamPassword}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <div className="l-left">팀 비밀번호 설정</div>
          <div className="l-right d-flex">
            <InputGroup>
              <InputGroup.Text id="team-count">전체팀수</InputGroup.Text>
              <Form.Control
                type="number"
                id="team-count"
                ref={teamCountInput}
                placeholder={`${teamCount}팀`}
              />
              <Button onClick={handleTeamCountSubmit}>확인</Button>
            </InputGroup>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {teamPasswords?.slice(0, teamCount).map(({ team, password }) => {
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
        <CustomModalFooter>
          <Button variant="primary" type="submit">
            적용
          </Button>
        </CustomModalFooter>
      </Form>
    </CustomModal>
  );
}
