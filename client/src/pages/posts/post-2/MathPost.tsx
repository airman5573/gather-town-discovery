/** @jsxImportSource @emotion/react */
import Upload from '../upload/Upload';
import { Col, Row } from 'react-bootstrap';
import MathImage from './math.jpeg';
import { postContainer } from './style';

export default function MathPost() {
  return (
    <Row className="post-container post-container" css={postContainer}>
      <Col className="mission">
        <h1 className="t-center">미션 안내</h1>
        <div>
          <img src={MathImage} alt="" />
        </div>
      </Col>
      <Col className="answer">
        <h1 className="t-center">미션 제출</h1>
        <Upload post={2}></Upload>
      </Col>
    </Row>
  );
}
