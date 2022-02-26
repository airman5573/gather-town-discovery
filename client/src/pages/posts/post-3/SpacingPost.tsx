/** @jsxImportSource @emotion/react */
import Upload from '../upload/Upload';
import { Col, Row } from 'react-bootstrap';
import SpacingImage from './spacing.jpeg';
import { postContainer } from './style';

export default function SpacingPost() {
  return (
    <Row className="post-container post-container" css={postContainer}>
      <Col className="mission">
        <h1 className="t-center">미션 안내</h1>
        <div>
          <img src={SpacingImage} alt="" />
        </div>
      </Col>
      <Col className="answer">
        <h1 className="t-center">미션 제출</h1>
        <Upload post={3}></Upload>
      </Col>
    </Row>
  );
}
