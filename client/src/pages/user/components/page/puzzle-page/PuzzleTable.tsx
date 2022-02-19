/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler } from 'react';
import { PuzzleEntity } from '../../../../../common/types';
import toasty from '../../../../../utils/toasty';
import puzzleApi from '../../../../admin/redux/api/puzzle.api';
import { table } from './style';

type TPuzzleTable = {
  team: number;
  allTeamPuzzleData: Array<PuzzleEntity>;
};

export default function PuzzleTable({ team, allTeamPuzzleData }: TPuzzleTable) {
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
            const boxKey = `${index}:${i}`;
            return (
              <td
                data-team={openedBoxWithTeamMap[boxKey]}
                data-key={boxKey}
                key={boxKey}
              ></td>
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
    <div className="puzzle-table">{generateTable(8, 12, handleTableClick)}</div>
  );
}
