/** @jsxImportSource @emotion/react */
import Upload from '../upload/Upload';
import { Col, Row } from 'react-bootstrap';
import EnglishImage from './english.jpg';
import { postContainer } from './style';

export default function EnglishPost() {
  return (
    <Row className="post-container post-container" css={postContainer}>
      <Col className="mission">
        <h1 className="t-center">미션 안내</h1>
        <div>
          <img src={EnglishImage} alt="" />
        </div>
      </Col>
      <Col className="answer">
        <h1 className="t-center">미션 제출</h1>
        <Upload post={4}></Upload>
      </Col>
    </Row>
  );
}
