export const MAX_TEAM = 10;
export const TEAMS: number[] = [...Array(MAX_TEAM).keys()].map((i) => i + 1);

export const ACCESS_TOKEN_KEY = 'discovery-gather-town-access-token-key';

export const FILE_EXTENSIONS = {
  video: ['3gp', 'avi', 'mov', 'mp4', 'mpeg', 'ogg', 'ogv', 'webm', 'wmv'],
  image: ['jpeg', 'jpg', 'png', 'gif'],
};

export const TEAM_COLORS = [
  '#ffffff', // white => 0팀은 없으니까
  '#0000ff', // blue, => 1팀
  '#FF0000', // red, => 2팀
  '#ffff00', // lime => 3팀
  '#ff69B4', // hotpink => 4팀
  '#a0522d', // sienna(brown) => 5팀
  '#00bfff', // deepskyblue => 6팀
  '#ffa500', // orange => 7팀
  '#00FF00', // lime => 8팀
];

export const MAX_POST = 10;

export const PUZZLE_COLS = 12;

export const PUZZLE_PLACE_HOLDER = '@';
