/** @jsxImportSource @emotion/react */
import { preview as previewStyle } from './style';
import { ListGroup, ProgressBar } from 'react-bootstrap';

type TPreviewItem = {
  filename: string;
  preview: string;
  percentage: number;
};

export default function PreviewItem({ preview, percentage }: TPreviewItem) {
  return (
    <ListGroup.Item css={previewStyle}>
      <div className="l-left">
        <img className="img-thumbnail" src={preview} alt="" />
      </div>
      <div className="l-right">
        <ProgressBar now={percentage} label={`${percentage}%`} />
      </div>
    </ListGroup.Item>
  );
}
