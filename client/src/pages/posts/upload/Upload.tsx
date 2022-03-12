/** @jsxImportSource @emotion/react */
import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { fileUploadZone, uploadBtnContainer } from './style';
import { Button } from 'react-bootstrap';
import PreviewList from './PreviewList';
import { upload } from '../../../utils/files';
import removeWhiteSpace from '../../../utils/remove-white-space';
import toasty from '../../../utils/toasty';
import { UploadConfig } from '../../../common/types';

type TFileWithPreview = File & {
  preview: string;
};

type TProgressInfo = {
  [filename in string]: number;
};

type TProps = {
  post: number;
  team: number;
  token: string;
};

export default function Upload({ post, team, token }: TProps) {
  const progressInfoStore = useRef<TProgressInfo>({});
  const [files, setFiles] = useState<Array<TFileWithPreview>>([]);
  const [progressInfo, setProgressInfo] = useState<TProgressInfo>(
    progressInfoStore.current,
  );

  const handleUploadBtnClick = async (team: number, token: string) => {
    let hasError = false;
    for (const file of files) {
      try {
        const config: UploadConfig = {
          team,
          post,
          file,
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (100 * progressEvent.loaded) / progressEvent.total,
            );
            progressInfoStore.current[removeWhiteSpace(file.name)] = percentage;
            setProgressInfo({ ...progressInfoStore.current });
          },
          accessToken: token,
        };
        await upload(config);
      } catch (err) {
        hasError = true;
        toasty.error('업로드중 에러가 발생했습니다');
        console.error(err);
      }
    }

    // after all file upload
    if (!hasError) {
      setTimeout(() => {
        toasty.success('성공적으로 업로드하였습니다');
        reset();
      }, files.length * 250);
    }
  };

  const onDrop = (acceptedFiles: Array<File>) => {
    const newFiles = acceptedFiles.map((file: File) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setFiles([...files, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const inputProps = {
    ...getInputProps(),
    multiple: true,
    accept: 'image/*, video/*',
  };
  const rootProps = {
    ...getRootProps(),
  };

  const reset = () => {
    files.forEach((file) => {
      URL.revokeObjectURL(file.preview);
    });
    setFiles([]);
    setProgressInfo({});
    progressInfoStore.current = {};
  };

  return (
    <>
      <div css={fileUploadZone} {...rootProps}>
        <input {...inputProps} />
        {isDragActive ? (
          <p className="drag-active-guide">이미지를 놓아주세요</p>
        ) : (
          <div className="guide">
            <div>
              <i className="guide-icon material-icons">cloud_upload</i>
            </div>
            <div className="guide-text">여기에 이미지를 놓아주세요</div>
          </div>
        )}
      </div>
      <div className="previews">
        {files.length > 0 && (
          <>
            <PreviewList
              files={files}
              progressInfo={progressInfo}
            ></PreviewList>
            <div css={uploadBtnContainer}>
              <Button
                onClick={() => {
                  handleUploadBtnClick(team, token);
                }}
                size="lg"
              >
                업로드
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
