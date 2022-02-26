/** @jsxImportSource @emotion/react */
import Upload from '../upload/Upload';
import { Col, Row } from 'react-bootstrap';
import MissionImage from './decryption.png';
import { postContainer } from './style';

export default function DecryptionPost() {
  return (
    <Row className="post-container post-container" css={postContainer}>
      <Col className="mission">
        <h1 className="t-center">미션 안내</h1>
        <div>
          <img src={MissionImage} alt="" />
        </div>
      </Col>
      <Col className="answer">
        <h1 className="t-center">미션 제출</h1>
        <Upload post={1}></Upload>
      </Col>
    </Row>
  );
}
