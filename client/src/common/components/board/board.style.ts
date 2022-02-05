import { css } from '@emotion/react';

export const sidebarStyle = css`
  width: 250px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 0 0px 15px 8px rgba(0, 0, 0, 0.06),
    0 1px 0px 0 rgba(0, 0, 0, 0.02);
`;

export const mainStyle = css`
  width: 100%;
  margin-left: 250px;
  padding: 30px;
`;

export const menuItemStyle = css`
  position: relative;
  cursor: pointer;
  text-align: center;
  border-bottom: 1px solid #efefef;

  &.is-active {
    background-color: #1b8bf9;
    button {
      color: white;
    }
  }

  & > button {
    width: 100%;
    -webkit-appearance: none;
    position: relative;
    display: block;
    padding: 0;
    margin: 0;
    overflow: visible;
    color: black;
    font: inherit;
    font-size: 1em;
    line-height: 60px;
    font-weight: 400;
    text-align: center;
    letter-spacing: 1px;
    background: transparent;
    border: 0;
    user-select: none;
    transition: all 0.4s ease;
    cursor: pointer;

    &:hover {
      background-color: rgba(234, 226, 226, 0.45);
    }

    &:hover,
    &:focus {
      outline: 0;
      text-decoration: none;
    }
  }
`;
