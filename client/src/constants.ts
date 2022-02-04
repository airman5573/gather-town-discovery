import { MenuItemProps, NavMenuItemEnum, PointTableKey } from './types';
import camelCaseToHyphen from './utils/camelCase-to-hyphen';

export const MAX_TEAM = 10;
export const TEAMS: number[] = [...Array(MAX_TEAM).keys()].map((i) => i + 1);

export const ACCESS_TOKEN_KEY = 'discovery-gather-town-access-token-key';
enum REQUEST_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

export const MENU_ITEM_LIST: Array<MenuItemProps> = [
  { label: '팀 비밀번호', className: NavMenuItemEnum.TeamPasswords },
  { label: '타이머', className: NavMenuItemEnum.Timer },
  { label: '이미지설정', className: NavMenuItemEnum.Upload },
  { label: '구역설정', className: NavMenuItemEnum.PuzzleSetting },
  { label: '구역점유현황', className: NavMenuItemEnum.PuzzleStatus },
  { label: '본부 점수 제공', className: NavMenuItemEnum.TeamPoints },
  { label: '최종결과', className: NavMenuItemEnum.Statistics },
  { label: '점수배정표', className: NavMenuItemEnum.PointTable },
  { label: '관리자 비밀번호', className: NavMenuItemEnum.AdminPassword },
  { label: '초기화', className: NavMenuItemEnum.Reset },
];

export const API_URL = {
  AUTH: {
    LOGIN: {
      method: REQUEST_METHOD.POST,
      url: 'auth/login',
    },
    GET_USER: {
      method: REQUEST_METHOD.GET,
      url: 'auth/user',
    },
  },
  OPTIONS: {
    ALL: {
      method: REQUEST_METHOD.GET,
      url: 'options',
    },
    ADMIN_PASSWORD: {
      GET: {
        method: REQUEST_METHOD.GET,
        url: 'options/admin-password',
      },
      UPDATE: {
        method: REQUEST_METHOD.PUT,
        url: 'options/admin-password',
      },
    },
    CAN_SUBMIT_DESCRYPTED_SENTENCE: {
      GET: {
        method: REQUEST_METHOD.GET,
        url: 'options/can-submit-descrypted-sentence',
      },
      UPDATE: {
        method: REQUEST_METHOD.PUT,
        url: 'options/can-submit-descrypted-sentence',
      },
    },
    PUZZLE_COUNT: {
      GET: {
        method: REQUEST_METHOD.GET,
        url: 'options/puzzle-count',
      },
      UPDATE: {
        method: REQUEST_METHOD.PUT,
        url: 'options/puzzle-count',
      },
    },
    ORIGINAL_PUZZLE_MESSAGE: {
      GET: {
        method: REQUEST_METHOD.GET,
        url: 'options/original-puzzle-message',
      },
    },
    SHUFFLED_PUZZLE_MESSAGE_WITH_PLACEHOLDER: {
      GET: {
        method: REQUEST_METHOD.GET,
        url: 'options/shuffled-puzzle-message-with-placeholder',
      },
    },
    PUZZLE_MESSAGE: {
      GET: {
        method: REQUEST_METHOD.GET,
        url: 'options/puzzle-message',
      },
      UPDATE: {
        method: REQUEST_METHOD.PUT,
        url: 'options/puzzle-message',
      },
    },
    GET_LAST_PUZZLE_VIDEO_URL: {
      GET: {
        method: REQUEST_METHOD.GET,
        url: 'options/last-puzzle-video-url',
      },
      UPDATE: {
        method: REQUEST_METHOD.PUT,
        url: 'options/last-puzzle-video-url',
      },
    },
    CAN_OPEN_LAST_PUZZLE: {
      GET: {
        method: REQUEST_METHOD.GET,
        url: 'options/can-open-last-puzzle',
      },
      UPDATE: {
        method: REQUEST_METHOD.PUT,
        url: 'options/can-open-last-puzzle',
      },
    },
    IS_RUNNING_TIMER: {
      GET: {
        method: REQUEST_METHOD.GET,
        url: 'options/is-running-timer',
      },
      UPDATE: {
        method: REQUEST_METHOD.PUT,
        url: 'options/is-running-timer',
      },
    },
    COMPANY_IMAGE: {
      method: REQUEST_METHOD.GET,
      url: 'options/company-image',
    },
    MAP_IMAGE: {
      method: REQUEST_METHOD.GET,
      url: 'options/map-image',
    },
  },
  POINT_TABLE: {
    GET_ALL: {
      method: REQUEST_METHOD.GET,
      url: 'point-table',
    },
    GET: (key: PointTableKey) => {
      return {
        method: REQUEST_METHOD.GET,
        url: `point-table/${camelCaseToHyphen(key)}`,
      };
    },
    UPDATE: (key: PointTableKey) => {
      return {
        method: REQUEST_METHOD.PUT,
        url: `point-table/${camelCaseToHyphen(key)}`,
      };
    },
    RESET: {
      method: REQUEST_METHOD.PUT,
      url: 'point-table',
    },
  },
  PUZZLE: {
    GET_ALL: {
      method: REQUEST_METHOD.GET,
      url: 'puzzle',
    },
    GET: (team: number) => {
      return {
        method: REQUEST_METHOD.GET,
        url: `puzzle/${team}`,
      };
    },
    OPEN: {
      method: REQUEST_METHOD.PUT,
      url: 'puzzle/open',
    },
    RESET: {
      method: REQUEST_METHOD.PUT,
      url: 'puzzle/reset',
    },
  },
  RESET: {
    method: REQUEST_METHOD.PUT,
    url: 'reset',
  },
  STATISTICS: {
    method: REQUEST_METHOD.GET,
    url: 'statistics',
  },
  TEAM_PASSWORD: {
    GET_ALL: {
      method: REQUEST_METHOD.GET,
      url: 'team-password/all',
    },
    UPDATE: {
      method: REQUEST_METHOD.PUT,
      url: 'team-password',
    },
    RESET: {
      method: REQUEST_METHOD.GET,
      url: 'team-password',
    },
  },
  TEAM_POINT: {
    GET_ALL: {
      method: REQUEST_METHOD.GET,
      url: 'team-point/all',
    },
    GET: {
      method: REQUEST_METHOD.GET,
      url: 'team-point',
    },
    GET_BY_ADMIN: (team: number) => {
      return {
        method: REQUEST_METHOD.GET,
        url: `team-point/${team}`,
      };
    },
    UPDATE: {
      method: REQUEST_METHOD.PUT,
      url: 'team-point',
    },
    RESET: {
      method: REQUEST_METHOD.PUT,
      url: 'team-point/reset',
    },
  },
  TIMER: {
    GET_ALL: {
      method: REQUEST_METHOD.GET,
      url: 'timer/all',
    },
    GET: (team: number) => {
      return {
        method: REQUEST_METHOD.GET,
        url: `timer/${team}`,
      };
    },
    UPDATE: (team: number) => {
      return {
        method: REQUEST_METHOD.PUT,
        url: `timer/${team}`,
      };
    },
    RESET: {
      method: REQUEST_METHOD.PUT,
      url: 'timer/reset',
    },
    START: {
      method: REQUEST_METHOD.POST,
      url: 'timer',
    },
  },
  MISSION_UPLOAD: {
    GET: {
      method: REQUEST_METHOD.GET,
      url: 'mission-upload',
    },
    RESET: {
      method: REQUEST_METHOD.PUT,
      url: 'mission-upload/reset',
    },
  },
};

export const FILE_EXTENSIONS = {
  video: ['3gp', 'avi', 'mov', 'mp4', 'mpeg', 'ogg', 'ogv', 'webm', 'wmv'],
  image: ['jpeg', 'jpg', 'png', 'gif'],
};
