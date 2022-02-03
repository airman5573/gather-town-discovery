import AdminPasswordModal from './AdminPasswordModal';
import PointTableModal from './PointTableModal';
import PuzzleSettingModal from './PuzzleSettingModal';
import PuzzleStatusModal from './PuzzleStatusModal';
import ResetModal from './ResetModal';
import StatisticsModal from './StatisticsModal';
import TeamPasswordModal from './TeamPasswordModal';
import TeamPointsModal from './TeamPointsModal';
import TimerModal from './TimerModal';
import UploadModal from './UploadModal';

export default function Modals() {
  return (
    <div className="modals">
      <PointTableModal></PointTableModal>
      <PuzzleSettingModal></PuzzleSettingModal>
      <PuzzleStatusModal></PuzzleStatusModal>
      <ResetModal></ResetModal>
      <StatisticsModal></StatisticsModal>
      <TeamPasswordModal></TeamPasswordModal>
      <TeamPointsModal></TeamPointsModal>
      <TimerModal></TimerModal>
      <UploadModal></UploadModal>
      <AdminPasswordModal></AdminPasswordModal>
    </div>
  );
}
