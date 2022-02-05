import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Button, Modal, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { YesOrNo } from '../../../../common/types';
import toasty from '../../../../utils/toasty';
import { useAppSelector } from '../../redux';
import optionApi from '../../redux/api/option.api';
import { NavMenuItemEnum } from '../../types';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

type PuzzleMessageFormValue = {
  puzzleMessage: string;
};

type LastPuzzleVideoUrlFormValue = {
  videoUrl: string;
};

export default function PuzzleSettingModal() {
  // puzzleMessageForm
  const puzzleMessageForm = useForm<PuzzleMessageFormValue>();
  const puzzleMessageObj = optionApi.useGetOriginalPuzzleMessageQuery();
  const [updatePuzzleMessage] = optionApi.useUpdatePuzzleMessageMutation();
  const handlePuzzleMessageFormSubmit = ({
    puzzleMessage,
  }: PuzzleMessageFormValue) => {
    updatePuzzleMessage({ message: puzzleMessage })
      .unwrap()
      .then(() => {
        toasty.success('구역 메세지를 변경했습니다');
        puzzleMessageForm.reset();
      })
      .catch((e) => {
        const { message } = e.data;
        toasty.error(message[0]);
      });
  };

  // lastVideoUrlForm
  const lastPuzzleVideoUrlForm = useForm<LastPuzzleVideoUrlFormValue>();
  const lastPuzzleVideoUrlObj = optionApi.useGetLastPuzzleVideoUrlQuery();
  const [updateLastPuzzleVideoUrl] =
    optionApi.useUpdateLastPuzzleVideoUrlMutation();
  const handleLastFormVideoUrl = ({
    videoUrl,
  }: LastPuzzleVideoUrlFormValue) => {
    updateLastPuzzleVideoUrl({ videoUrl })
      .unwrap()
      .then(() => {
        toasty.success('동영상 주소를 변경했습니다');
        lastPuzzleVideoUrlForm.reset();
      })
      .catch((e: any) => {
        console.log('e :', e);
      });
  };

  // canOpenLastPuzzle
  const canOpenLastPuzzleObj = optionApi.useGetCanOpenLastPuzzleQuery();
  const [updateCanOpenLastPuzzle] =
    optionApi.useUpdateCanOpenLastPuzzleMutation();
  const handleCanOpenLastPuzzleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const status = e.currentTarget.value as YesOrNo;
    updateCanOpenLastPuzzle({ status })
      .unwrap()
      .then(() => {
        toasty.success(
          status === YesOrNo.YES
            ? '물음표 구역을 열수 있도록 변경했습니다'
            : '물음표 구역을 열수 없도록 변경했습니다',
        );
      })
      .catch((e) => {
        console.error(e);
        const { message } = e.data;
        toasty.error(message[0]);
      });
  };

  // canSubmitDescryptedSentence
  const canSubmitDescryptedSentenceObj =
    optionApi.useGetCanSubmitDescryptedSentenceQuery();
  const [updateCanSubmitDescryptedSentence] =
    optionApi.useUpdateCanSubmitDescryptedSentenceMutation();
  const handleCanSubmitDescryptedSentenceStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const status = e.currentTarget.value as YesOrNo;
    updateCanSubmitDescryptedSentence({ status })
      .unwrap()
      .then(() => {
        toasty.success(
          status === YesOrNo.YES
            ? '해독한 문장을 제출할 수 있도록 변경했습니다'
            : '해독한 문장을 제출할 수 없도록 변경했습니다',
        );
      })
      .catch((e) => {
        console.error(e);
        const { message } = e.data;
        toasty.error(message[0]);
      });
  };

  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  useEffect(() => {
    puzzleMessageObj.refetch();
    lastPuzzleVideoUrlObj.refetch();
    canOpenLastPuzzleObj.refetch();
    canSubmitDescryptedSentenceObj.refetch();
  }, [activeNavMenuItem]);

  return (
    <CustomModal
      className="puzzle-setting-modal"
      navMenuItem={NavMenuItemEnum.PuzzleSetting}
    >
      <Modal.Header>구역설정</Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col xs="12" className="d-flex justify-content-between">
            <Form
              onSubmit={puzzleMessageForm.handleSubmit(
                handlePuzzleMessageFormSubmit,
              )}
              className="flex-grow-1"
            >
              <div>
                <label htmlFor="message-input" className="mb-2">
                  구역 메세지
                </label>
              </div>
              <div>
                <InputGroup>
                  <Form.Control
                    placeholder={puzzleMessageObj.data?.optionValue}
                    {...puzzleMessageForm.register('puzzleMessage', {
                      required: true,
                    })}
                    isInvalid={puzzleMessageForm.formState.errors.hasOwnProperty(
                      'puzzleMessage',
                    )}
                  />
                  <Button type="submit" className="ml-2" variant="primary">
                    확인
                  </Button>
                </InputGroup>
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs="12" className="d-flex justify-content-between">
            <Form
              onSubmit={lastPuzzleVideoUrlForm.handleSubmit(
                handleLastFormVideoUrl,
              )}
              className="flex-grow-1"
            >
              <div>
                <label htmlFor="message-input" className="mb-2">
                  최종구역 동영상 구글드라이브 주소
                </label>
              </div>
              <div>
                <InputGroup>
                  <Form.Control
                    placeholder={lastPuzzleVideoUrlObj.data?.optionValue}
                    {...lastPuzzleVideoUrlForm.register('videoUrl', {
                      required: true,
                      pattern: {
                        value:
                          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                        message: '주소를 다시 확인해 주세요',
                      },
                    })}
                    isInvalid={lastPuzzleVideoUrlForm.formState.errors.hasOwnProperty(
                      'videoUrl',
                    )}
                  />
                  <Button type="submit" className="ml-2" variant="primary">
                    확인
                  </Button>
                </InputGroup>
                <div
                  className={classNames('invalid-feedback', {
                    'd-block':
                      lastPuzzleVideoUrlForm.formState.errors.hasOwnProperty(
                        'videoUrl',
                      ),
                  })}
                >
                  {lastPuzzleVideoUrlForm.formState.errors.hasOwnProperty(
                    'videoUrl',
                  ) &&
                    lastPuzzleVideoUrlForm.formState.errors.videoUrl?.message}
                </div>
              </div>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <div className="d-flex">
              <label className="me-3">물음표 구역 :</label>
              <div className="radio abc-radio abc-radio-primary me-3">
                <input
                  className="me-2"
                  type="radio"
                  id="can-open-last-puzzle-radio--yes"
                  name="canOpenLastPuzzle"
                  onChange={handleCanOpenLastPuzzleStatusChange}
                  checked={
                    canOpenLastPuzzleObj.data?.optionValue === YesOrNo.YES
                      ? true
                      : false
                  }
                  value={YesOrNo.YES}
                />
                <label htmlFor="can-open-last-puzzle-radio--yes">공개</label>
              </div>
              <div className="radio abc-radio abc-radio-danger">
                <div className="radio abc-radio abc-radio-primary mr-3">
                  <input
                    className="me-2"
                    type="radio"
                    id="can-open-last-puzzle-radio--no"
                    name="canOpenLastPuzzle"
                    onChange={handleCanOpenLastPuzzleStatusChange}
                    checked={
                      canOpenLastPuzzleObj.data?.optionValue === YesOrNo.NO
                        ? true
                        : false
                    }
                    value={YesOrNo.NO}
                  />
                  <label htmlFor="can-open-last-puzzle-radio--no">비공개</label>
                </div>
              </div>
            </div>
          </Col>
          <Col xs="6">
            <div className="d-flex">
              <label className="me-3">문장해독 :</label>
              <div className="radio abc-radio abc-radio-primary me-3">
                <input
                  className="me-2"
                  type="radio"
                  id="can-submit-descrypted-sentence-radio--yes"
                  name="canSubmitDescryptedSentence"
                  onChange={handleCanSubmitDescryptedSentenceStatusChange}
                  checked={
                    canSubmitDescryptedSentenceObj.data?.optionValue ===
                    YesOrNo.YES
                      ? true
                      : false
                  }
                  value={YesOrNo.YES}
                />
                <label htmlFor="can-submit-descrypted-sentence-radio--yes">
                  허용
                </label>
              </div>
              <div className="radio abc-radio abc-radio-danger">
                <div className="radio abc-radio abc-radio-primary mr-3">
                  <input
                    className="me-2"
                    type="radio"
                    id="can-submit-descrypted-sentence-radio--no"
                    name="canSubmitDescryptedSentence"
                    onChange={handleCanSubmitDescryptedSentenceStatusChange}
                    checked={
                      canSubmitDescryptedSentenceObj.data?.optionValue ===
                      YesOrNo.NO
                        ? true
                        : false
                    }
                    value={YesOrNo.NO}
                  />
                  <label htmlFor="can-submit-descrypted-sentence-radio--no">
                    금지
                  </label>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
