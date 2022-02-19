/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler } from 'react';
import { PuzzleEntity } from '../../../../../common/types';
import { PUZZLE_COLS, PUZZLE_PLACE_HOLDER } from '../../../../../constants';
import toasty from '../../../../../utils/toasty';
import puzzleApi from '../../../../admin/redux/api/puzzle.api';
import { puzzleTableContainer, table } from './style';

type TPuzzleTable = {
  team: number;
  allTeamPuzzleData: Array<PuzzleEntity>;
  shuffledPuzzleMessage: Array<string>;
};

export default function PuzzleTable({
  team,
  allTeamPuzzleData,
  shuffledPuzzleMessage,
}: TPuzzleTable) {
  const [clickable, setClickable] = React.useState(true);
  const [openPuzzle] = puzzleApi.useOpenMutation();
  const openedBoxWithTeamMap = allTeamPuzzleData.reduce(
    (acc: { [k in string]: number }, cur: PuzzleEntity) => {
      const team = cur.team;
      cur.openedBoxList &&
        cur.openedBoxList.map((boxKey) => {
          acc[boxKey] = team;
        });
      return acc;
    },
    {},
  );
  const generateTable = (
    rows: number,
    cols: number,
    handleTableClick: MouseEventHandler<HTMLTableElement>,
  ) => {
    const row = (index: number) => {
      return (
        <tr key={`tr-${index}`}>
          {new Array(cols).fill(0).map((_, i) => {
            const [row, col] = [index, i];
            const boxKey = `${row}:${col}`;
            const boxIndex = row * PUZZLE_COLS + col;
            const char =
              shuffledPuzzleMessage[boxIndex] === PUZZLE_PLACE_HOLDER
                ? ''
                : shuffledPuzzleMessage[boxIndex];
            return (
              <td
                data-team={openedBoxWithTeamMap[boxKey]}
                data-key={boxKey}
                key={boxKey}
              >
                {openedBoxWithTeamMap[boxKey] ? char : ''}
              </td>
            );
          })}
        </tr>
      );
    };
    return (
      <table onClick={handleTableClick} css={table}>
        <tbody>{new Array(rows).fill(0).map((_, i) => row(i))}</tbody>
      </table>
    );
  };
  const handleTableClick = (event: React.MouseEvent<HTMLTableElement>) => {
    if (!clickable) {
      return;
    }
    setClickable(false);
    setTimeout(() => {
      setClickable(true);
    }, 1000);
    if (!event.target) {
      return;
    }
    const el = event.target as HTMLTableCellElement;
    const boxKey = el.getAttribute('data-key');
    if (boxKey === null) {
      return;
    }
    openPuzzle({ team, boxKey })
      .unwrap()
      .then((res) => {
        console.log('response :', res);
      })
      .catch((err) => {
        console.log('err :', err);
        const { message } = err.data;
        toasty.error(message);
      });
  };
  return (
    <div className="puzzle-table">
      {generateTable(8, PUZZLE_COLS, handleTableClick)}
    </div>
  );
}
