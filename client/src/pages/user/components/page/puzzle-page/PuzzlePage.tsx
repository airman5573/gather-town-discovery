/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import useAuth from '../../../../../auth/auth.hooks';
import puzzleApi from '../../../../admin/redux/api/puzzle.api';
import { NavMenuItemEnum } from '../../../types';
import PageWrapper from '../PageWrapper';
import DescryptSentenceInput from './DescryptSentenceInput';
import PuzzleTable from './PuzzleTable';

export default function PuzzlePage() {
  const { user } = useAuth();
  const team = user?.team;
  const { data } = puzzleApi.useGetAllQuery(undefined, {
    pollingInterval: 250,
  });
  if (!team) {
    return <h2>팀설정이 필요합니다</h2>;
  }
  return (
    <PageWrapper className="puzzle-page" navMenuItem={NavMenuItemEnum.Puzzle}>
      <div className="d-flex flex-column align-items-center">
        <DescryptSentenceInput team={team} />
        {data && (
          <PuzzleTable team={team} allTeamPuzzleData={data}></PuzzleTable>
        )}
      </div>
    </PageWrapper>
  );
}
