import MapPage from './map-page/MapPage';
import PointPage from './point-page/PointPage';
import PuzzlePage from './puzzle-page/PuzzlePage';
import UploadPage from './upload-page/UploadPage';

export default function Pages() {
  return (
    <div className="pages">
      <MapPage />
      <PointPage />
      <PuzzlePage />
      <UploadPage />
    </div>
  );
}
