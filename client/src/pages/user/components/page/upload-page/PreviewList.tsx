/** @jsxImportSource @emotion/react */
import { ListGroup } from 'react-bootstrap';
import removeWhiteSpace from '../../../../../utils/remove-white-space';
import PreviewItem from './PreviewItem';

type TProgressInfo = {
  [filename in string]: number;
};
type TFileWithPreview = File & {
  preview: string;
};
type TPreviewList = {
  files: Array<TFileWithPreview>;
  progressInfo: TProgressInfo;
};
export default function PreviewList({ files, progressInfo }: TPreviewList) {
  console.log('PreviewList - progressInfo :', progressInfo);
  return (
    <ListGroup>
      {files.map((file) => {
        const filename = removeWhiteSpace(file.name);
        const percentage = progressInfo.hasOwnProperty(filename)
          ? progressInfo[filename]
          : 0;
        return (
          <PreviewItem
            key={filename}
            filename={filename}
            preview={file.preview}
            percentage={percentage}
          ></PreviewItem>
        );
      })}
    </ListGroup>
  );
}
