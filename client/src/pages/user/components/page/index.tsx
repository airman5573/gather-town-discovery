import { NavMenuItemEnum } from '../../types';
import MapPage from './map-page/MapPage';
import PageWrapper from './PageWrapper';
import PointPage from './point-page/PointPage';
import PuzzlePage from './puzzle-page/PuzzlePage';
import UploadPage from './upload-page/UploadPage';

export default function Pages() {
  return (
    <div className="pages">
      <MapPage />
      <PageWrapper className="point-page" navMenuItem={NavMenuItemEnum.Point}>
        <PointPage />
      </PageWrapper>
      <PageWrapper className="puzzle-page" navMenuItem={NavMenuItemEnum.Puzzle}>
        <PuzzlePage />
      </PageWrapper>
      <PageWrapper className="upload-page" navMenuItem={NavMenuItemEnum.Upload}>
        <UploadPage />
      </PageWrapper>
    </div>
  );
}
