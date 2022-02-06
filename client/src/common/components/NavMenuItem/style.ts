import { css } from '@emotion/react';

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
