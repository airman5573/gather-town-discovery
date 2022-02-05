import { useEffect } from 'react';
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
import { PointType, TeamPoint } from '../../../../common/types';
import toasty from '../../../../utils/toasty';
import { useAppSelector } from '../../redux';
import teamPointApi from '../../redux/api/team-point.api';
import { NavMenuItemEnum } from '../../types';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

type FormValues = Array<TeamPoint>;

export default function TeamPointModal() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const { data: teamPoints, refetch } = teamPointApi.useGetAllQuery();

  const [updateTeamPoints] = teamPointApi.useUpdateMutation();
  const onSubmit = (data: { [team: number]: TeamPoint }) => {
    const teamPointValues = Object.values(data)
      .filter(({ point }) => {
        return !isNaN(point) && Math.abs(point) > 0;
      })
      .map(({ team, point }) => {
        return { team, point, pointType: PointType.Usable };
      });
    // empty check
    if (teamPointValues.length === 0) {
      toasty.error('팀 점수를 입력해주세요');
      return;
    }
    updateTeamPoints({ teamPoints: teamPointValues })
      .unwrap()
      .then(() => {
        toasty.success('팀 점수를 부여했습니다');
        reset();
      })
      .catch((err) => {
        console.error(err);
        const message = err.data.message[0];
        toasty.error(message);
      });
  };

  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  useEffect(() => {
    refetch();
  }, [activeNavMenuItem]);

  return (
    <CustomModal
      className="team-point-modal"
      size="lg"
      navMenuItem={NavMenuItemEnum.TeamPoint}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>본부 점수 제공</Modal.Header>
        <Modal.Body>
          <Row>
            {teamPoints?.map(({ team, usable: point }) => {
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
                      type="number"
                      {...register(`${team - 1}.point` as const, {
                        valueAsNumber: true,
                      })}
                      placeholder={`${point}`}
                      isInvalid={errors.hasOwnProperty(team - 1)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.hasOwnProperty(team - 1)
                        ? errors[team - 1].point?.message
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
