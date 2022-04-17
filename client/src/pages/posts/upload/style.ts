import { css } from '@emotion/react';

export const fileUploadZone = css`
  width: 100%;
  height: calc(60vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
  border: 3px dashed #bfbfbf;
  background-color: #efefef;
  color: #bdbdbd;
  cursor: pointer;
  margin-bottom: 20px;
  .drag-active-guide {
    font-size: 30px;
  }
  i {
    font-size: 100px;
  }
  .guide-text {
    font-size: 30px;
  }

  &:hover {
    .guide-icon,
    .guide-text {
      color: #e52e2e;
    }
  }
`;

export const preview = css`
  display: flex;
  img {
    max-width: 150px;
  }
  p {
    flex: 1;
  }
  .l-right {
    display: flex;
    align-items: center;
    margin-left: 10px;
    flex: 1;
    .progress {
      height: 25px;
      width: 100%;
    }
  }
`;

export const uploadBtnContainer = css`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  margin-bottom: 20px;
`;
