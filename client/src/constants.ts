import { MenuItemProps, NavMenuItemEnum } from './common/types';
import camelCaseToHyphen from './utils/camelCase-to-hyphen';

export const MAX_TEAM = 10;
export const TEAMS: number[] = [...Array(MAX_TEAM).keys()].map((i) => i + 1);

export const ACCESS_TOKEN_KEY = 'discovery-gather-town-access-token-key';

export const FILE_EXTENSIONS = {
  video: ['3gp', 'avi', 'mov', 'mp4', 'mpeg', 'ogg', 'ogv', 'webm', 'wmv'],
  image: ['jpeg', 'jpg', 'png', 'gif'],
};
