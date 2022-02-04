import { useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { NavMenuItemEnum, TeamStatistics } from '../../../../types';
import { useAppSelector } from '../../redux';
import statisticsApi from '../../redux/api/statistics.api';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

type TTableRowProps = {
  row: TeamStatistics;
};

type TStatisticsTable = {
  data: Array<TeamStatistics>;
};

function TableRow({ row }: TTableRowProps) {
  const {
    team,
    usable,
    timer,
    boxOpen,
    sentenceDecryption,
    bingo,
    openEmptyBoxCount,
    openLetterBoxCount,
    percentageOfBoxOpen,
    sumOfPoint,
    contributionRank,
  } = row;
  return (
    <tr>
      <td colSpan={1}>{team}</td>

      <td colSpan={2}>{usable}</td>
      <td colSpan={2}>{timer}</td>
      <td colSpan={2}>{boxOpen}</td>
      <td colSpan={2}>{sentenceDecryption}</td>
      <td colSpan={2}>{bingo}</td>

      <td colSpan={2}>{openEmptyBoxCount}</td>
      <td colSpan={2}>{openLetterBoxCount}</td>
      <td colSpan={2}>{percentageOfBoxOpen}%</td>

      <td colSpan={2}>{sumOfPoint}</td>
      <td colSpan={2}>{contributionRank}</td>
    </tr>
  );
}

function StatisticsTable({ data }: TStatisticsTable) {
  return (
    <Table bordered={true}>
      <thead>
        <tr>
          <th rowSpan={2} colSpan={1}>
            TEAM
          </th>
          <th colSpan={10}>평가점수</th>
          <th colSpan={6}>구역점유</th>
          <th colSpan={4}>결과</th>
        </tr>
        <tr>
          <th colSpan={2}>가용점수</th>
          <th colSpan={2}>이동시간</th>
          <th colSpan={2}>구역점유</th>
          <th colSpan={2}>문장해독</th>
          <th colSpan={2}>구역연결점수</th>

          <th colSpan={2}>일반구역</th>
          <th colSpan={2}>글자구역</th>
          <th colSpan={2}>점유율</th>

          <th colSpan={2}>평가점수 합산</th>
          <th colSpan={2}>기여도순위</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return <TableRow row={row} key={row.team} />;
        })}
      </tbody>
    </Table>
  );
}

export default function StatisticsModal() {
  const { data, refetch } = statisticsApi.useGetStatisticsQuery();

  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  useEffect(() => {
    refetch();
  }, [activeNavMenuItem]);

  return (
    <CustomModal
      size="xl"
      className="statistics-modal"
      navMenuItem={NavMenuItemEnum.Statistics}
    >
      <Modal.Header>최종결과</Modal.Header>
      <Modal.Body>{data && <StatisticsTable data={data} />}</Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
