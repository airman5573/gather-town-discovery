import classNames from 'classnames';
import { useRef } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { MissionUploadFileType, PointType } from '../../../../common/types';
import toasty from '../../../../utils/toasty';
import missionUploadApi from '../../redux/api/mission-upload';

type TMissionUploadFileItemProps = Omit<
  MissionUploadFileType,
  'isCheckedByAdmin'
> & {
  className?: string;
};

export default function MissionUploadFileItem({
  filename,
  team,
  post,
  className,
}: TMissionUploadFileItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [checkUploadFile] = missionUploadApi.useCheckMutation();
  const cn = classNames('mission-upload-file-item', className); // className이 undefined면 알아서 무시함.
  const resetInput = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = '';
  };
  const handleRewardPointBtnClick = () => {
    if (!inputRef.current) {
      return;
    }
    const point = parseInt(inputRef.current.value, 10);
    if (!point) {
      toasty.error('점수를 입력해주세요');
      return;
    }
    checkUploadFile({ team, post, point, filename })
      .unwrap()
      .then(() => {
        toasty.success(`${team}팀에 ${point}점을 부여했습니다`);
      })
      .catch((e) => {
        const { message } = e.data;
        toasty.error(message[0]);
      })
      .finally(() => {
        resetInput();
      });
  };
  return (
    <div className={cn}>
      <Card>
        <Card.Img variant="top" src={`/public/uploads/user/${filename}`} />
        <Card.Body>
          <InputGroup>
            <InputGroup.Text>{team}팀</InputGroup.Text>
            <InputGroup.Text>{post}포스트</InputGroup.Text>
            <Form.Control
              type="number"
              ref={inputRef}
              placeholder="점수제공"
            ></Form.Control>
            <Button variant="primary" onClick={handleRewardPointBtnClick}>
              확인
            </Button>
          </InputGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
