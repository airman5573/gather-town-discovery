import { MissionUploadFileType } from '../../../../common/types';
import MissionUploadFileItem from './MissionUploadFileItem';

type TMissionUploadFileListProps = {
  missionFiles: Array<MissionUploadFileType>;
};

export default function MissionUploadFileList({
  missionFiles,
}: TMissionUploadFileListProps) {
  console.log('missionFiles in FileList:', missionFiles);
  return (
    <div className="mission-upload-file-list">
      <div className="container-fluid">
        <div className="row row-cols-3">
          {missionFiles.map(({ team, post, filename }) => {
            return (
              <MissionUploadFileItem
                key={`${team}-${post}-${filename}`}
                className="mb-4"
                filename={filename}
                team={team}
                post={post}
              ></MissionUploadFileItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}
