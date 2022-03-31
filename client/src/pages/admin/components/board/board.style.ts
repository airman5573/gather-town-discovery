import { css } from '@emotion/react';

export const sidebarStyle = css`
  width: 250px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #ffffff;
  box-shadow: 0 0px 15px 8px rgba(0, 0, 0, 0.06),
    0 1px 0px 0 rgba(0, 0, 0, 0.02);
`;

export const mainStyle = css`
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  padding-left: calc(250px + 30px);
  position: relative;
`;

export const loadMissionUploadFilesBtn = css`
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 8888;
`;
