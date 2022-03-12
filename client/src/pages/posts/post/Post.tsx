/** @jsxImportSource @emotion/react */
import Upload from '../upload/Upload';
import { Col, Row } from 'react-bootstrap';
import { postContainer } from './style';
import PostWrapper from '../post-wrapper/PostWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import TimerContainer from '../timer/TimerContainer';

type TProps = {
  missionImage: string;
  post: number;
};

export default function Post({ missionImage, post }: TProps) {
  const { team, token } = useSelector((state: RootState) => state.login);
  return (
    <PostWrapper>
      <>{!!team && <TimerContainer team={team} />}</>
      <Row className="post-container" css={postContainer}>
        <Col className="mission">
          <h1 className="t-center">미션 안내</h1>
          <div>
            <img src={missionImage} alt="" />
          </div>
        </Col>
        <Col className="answer">
          <h1 className="t-center">미션 제출</h1>
          {!!(team && token) && (
            <Upload post={post} team={team} token={token}></Upload>
          )}
        </Col>
      </Row>
    </PostWrapper>
  );
}
