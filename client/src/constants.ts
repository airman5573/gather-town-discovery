import { MenuItemProps, NavMenuItemEnum } from './types';
import camelCaseToHyphen from './utils/camelCase-to-hyphen';

export const MAX_TEAM = 10;
export const TEAMS: number[] = [...Array(MAX_TEAM).keys()].map((i) => i + 1);

export const ACCESS_TOKEN_KEY = 'discovery-gather-town-access-token-key';

export const MENU_ITEM_LIST: Array<MenuItemProps> = [
  { label: '팀 비밀번호', className: NavMenuItemEnum.TeamPassword },
  { label: '타이머', className: NavMenuItemEnum.Timer },
  { label: '이미지설정', className: NavMenuItemEnum.Upload },
  { label: '구역설정', className: NavMenuItemEnum.PuzzleSetting },
  { label: '구역점유현황', className: NavMenuItemEnum.PuzzleStatus },
  { label: '본부 점수 제공', className: NavMenuItemEnum.TeamPoint },
  { label: '최종결과', className: NavMenuItemEnum.Statistics },
  { label: '점수배정표', className: NavMenuItemEnum.PointTable },
  { label: '관리자 비밀번호', className: NavMenuItemEnum.AdminPassword },
  { label: '초기화', className: NavMenuItemEnum.Reset },
];

export const FILE_EXTENSIONS = {
  video: ['3gp', 'avi', 'mov', 'mp4', 'mpeg', 'ogg', 'ogv', 'webm', 'wmv'],
  image: ['jpeg', 'jpg', 'png', 'gif'],
};
