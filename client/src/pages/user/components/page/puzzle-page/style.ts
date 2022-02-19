import { css } from '@emotion/react';
import { TEAM_COLORS } from '../../../../../constants';

export const table = css`
  border: solid 1px black;
  border-spacing: 0;
  border-collapse: separate;
  padding: 0;
  tr {
    vertical-align: middle;
  }
  td {
    padding: 0;
    width: 80px;
    height: 80px;
    position: relative;
    border: 1px solid black;
    text-align: center;
    font-familly: sans;
    color: yellow;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    font-size: 36px;
  }
  td[data-team='1'] {
    background-color: ${TEAM_COLORS[1]};
  }
  td[data-team='2'] {
    background-color: ${TEAM_COLORS[2]};
  }
  td[data-team='3'] {
    background-color: ${TEAM_COLORS[3]};
  }
  td[data-team='4'] {
    background-color: ${TEAM_COLORS[4]};
  }
  td[data-team='5'] {
    background-color: ${TEAM_COLORS[5]};
  }
  td[data-team='6'] {
    background-color: ${TEAM_COLORS[6]};
  }
  td[data-team='7'] {
    background-color: ${TEAM_COLORS[7]};
  }
  td[data-team='8'] {
    background-color: ${TEAM_COLORS[8]};
  }
`;

export const inputGroup = css`
  min-width: 800px;
`;
