/** @jsxImportSource @emotion/react */
import { NavMenuItemEnum } from '../../../types';
import PageWrapper from '../PageWrapper';
import { useRef, useState } from 'react';
import { upload } from '../../../../../utils/files';
import { useDropzone } from 'react-dropzone';
import { fileUploadZone, uploadBtnContainer } from './style';
import { Button } from 'react-bootstrap';
import removeWhiteSpace from '../../../../../utils/remove-white-space';
import PreviewList from './PreviewList';
import toasty from '../../../../../utils/toasty';
import useAuth from '../../../../../auth/auth.hooks';

type TFileWithPreview = File & {
  preview: string;
};

type TProgressInfo = {
  [filename in string]: number;
};

export default function UploadPage() {
  const { user } = useAuth();
  const team = user?.team;
  if (!team) {
    return <h2>팀설정이 필요합니다</h2>;
  }
  const progressInfoStore = useRef<TProgressInfo>({});
  const [files, setFiles] = useState<Array<TFileWithPreview>>([]);
  const [progressInfo, setProgressInfo] = useState<TProgressInfo>(
    progressInfoStore.current,
  );
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

  const handleUploadBtnClick = async () => {
    let hasError = false;
    for (const file of files) {
      try {
        const result = await upload(team, 4, file, (progressEvent) => {
          console.log('onProgress is called');
          const percentage = Math.round(
            (100 * progressEvent.loaded) / progressEvent.total,
          );
          progressInfoStore.current[removeWhiteSpace(file.name)] = percentage;
          setProgressInfo({ ...progressInfoStore.current });
        });
        console.log('result :', result);
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

  return (
    <PageWrapper className="upload-page" navMenuItem={NavMenuItemEnum.Upload}>
      <div css={fileUploadZone} {...rootProps}>
        <input {...inputProps} />
        {isDragActive ? (
          <p className="drag-active-guide">이미지를 놓아주세요</p>
        ) : (
          <div className="guide">
            <div>
              <i className="guide-icon material-icons">cloud_upload</i>
            </div>
            <div className="guide-text">이미지 드랍 or 클릭</div>
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
              <Button onClick={handleUploadBtnClick} size="lg">
                업로드
              </Button>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}
