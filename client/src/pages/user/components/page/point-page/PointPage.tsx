/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { TEAM_COLORS } from '../../../../../constants';
import teamPointApi from '../../../../admin/redux/api/team-point.api';
import { PointChart } from './PointChart';
import { chartContainerStyle } from './style';

export default function PointPage() {
  const { data: teamPoints, refetch } = teamPointApi.useGetAllQuery();
  const data =
    teamPoints &&
    teamPoints.map((tp) => {
      return {
        team: `${tp.team}팀`,
        point: tp.usable,
        color: TEAM_COLORS[tp.team],
      };
    });
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <h1>팀별 가용점수</h1>
      <div className="chart-container" css={chartContainerStyle}>
        {data && <PointChart data={data}></PointChart>}
      </div>
    </>
  );
}
