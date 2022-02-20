/** @jsxImportSource @emotion/react */
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import CustomModal from '../CustomModal';
import optionApi from '../../redux/api/option.api';
import secondsToMinutes from '../../../../utils/seconds-to-minutes';
import { useForm } from 'react-hook-form';
import toasty from '../../../../utils/toasty';
import timerApi from '../../redux/api/timer.api';
import { useEffect } from 'react';
import { useAppSelector } from '../../redux';
import TimerBtn from '../TimerBtn';
import { TEAMS } from '../../../../constants';
import CustomModalFooter from '../CustomModalFooter';
import { css } from '@emotion/react';
import { NavMenuItemEnum } from '../../types';

const modalHeaderStyle = css`
  & > .l-right {
    flex-basis: 250px;
  }
`;

type LapTimeFormValue = {
  lapTime: string;
};

export default function TimerModal() {
  // lapTime Query
  const lapTimeObj = optionApi.useGetLapTimeQuery();
  const lapTime = lapTimeObj.data?.optionValue
    ? lapTimeObj.data.optionValue
    : 0;
  const [updateLapTime] = optionApi.useUpdateLapTimeMutation();

  // timer Query
  const timerObj = timerApi.useGetAllQuery();
  const timers = timerObj.data;
  const [startAllTimers] = timerApi.useStartAllMutation();

  const handleAllStartBtnClick = async () => {
    try {
      await startAllTimers(TEAMS);
      toasty.success('모든 팀의 타이머를 시작합니다');
    } catch (e: any) {
      console.log('e :', e);
    }
  };

  // lapTime Form
  const lapTimeForm = useForm<LapTimeFormValue>();
  const onLapTimeUpdateSubmit = async ({ lapTime }: { lapTime: string }) => {
    updateLapTime({ lapTime: Number(lapTime) })
      .unwrap()
      .then((data) => {
        toasty.success('랩타임을 성공적으로 수정했습니다');
        lapTimeForm.reset();
      })
      .catch((err) => {
        const message = err.data.message[0];
        toasty.error('랩타임 설정에 오류가 있습니다');
        lapTimeForm.setError('lapTime', {
          message,
        });
      });
  };

  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  useEffect(() => {
    lapTimeObj.refetch();
    timerObj.refetch();
  }, [activeNavMenuItem]);

  return (
    <CustomModal
      className="timer-modal"
      size="lg"
      navMenuItem={NavMenuItemEnum.Timer}
    >
      <Modal.Header
        className="d-flex justify-content-between align-items-center"
        css={modalHeaderStyle}
      >
        <div className="l-left">타이머</div>
        <div className="l-right">
          <Form onSubmit={lapTimeForm.handleSubmit(onLapTimeUpdateSubmit)}>
            <InputGroup className="lap-time align-items-center">
              <label className="pe-2">랩타임 :</label>
              <FormControl
                {...lapTimeForm.register('lapTime')}
                placeholder={secondsToMinutes(lapTime)}
                isInvalid={lapTimeForm.formState.errors?.lapTime ? true : false}
              />
              <Button variant="primary" type="submit">
                확인
              </Button>
            </InputGroup>
          </Form>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-grid mb-4">
          <Button variant="primary" onClick={handleAllStartBtnClick}>
            전체시작
          </Button>
        </div>
        <Row>
          {timers?.map(({ team, startTime, isRunning }) => {
            return (
              <Col sm="3" className="mb-3" key={team}>
                <TimerBtn
                  team={team}
                  startTime={startTime}
                  isRunning={isRunning}
                  lapTime={lapTime}
                ></TimerBtn>
              </Col>
            );
          })}
        </Row>
      </Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
