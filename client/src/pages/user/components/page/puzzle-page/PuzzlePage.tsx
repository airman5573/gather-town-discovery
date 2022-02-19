/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import useAuth from '../../../../../auth/auth.hooks';
import optionApi from '../../../../admin/redux/api/option.api';
import puzzleApi from '../../../../admin/redux/api/puzzle.api';
import { NavMenuItemEnum } from '../../../types';
import PageWrapper from '../PageWrapper';
import DescryptSentenceInput from './DescryptSentenceInput';
import PuzzleTable from './PuzzleTable';

export default function PuzzlePage() {
  const { user } = useAuth();
  const team = user?.team;
  if (!team) {
    return <h2>팀설정이 필요합니다</h2>;
  }
  const { data } = puzzleApi.useGetAllQuery(undefined, {
    pollingInterval: 400,
  });
  const { data: _shuffledPuzzleMessage, refetch } =
    optionApi.useGetShuffledPuzzleMessageWithPlaceholderQuery();
  useEffect(() => {
    refetch();
  }, []);
  const shuffledPuzzleMessage = _shuffledPuzzleMessage?.optionValue;
  return (
    <div className="d-flex flex-column align-items-center">
      <DescryptSentenceInput team={team} />
      {data && shuffledPuzzleMessage && (
        <PuzzleTable
          team={team}
          allTeamPuzzleData={data}
          shuffledPuzzleMessage={shuffledPuzzleMessage}
        ></PuzzleTable>
      )}
    </div>
  );
}
