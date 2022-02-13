/** @jsxImportSource @emotion/react */
import classNames from 'classnames';
import { Button, Row } from 'react-bootstrap';
import { NavMenuItem } from '../../../../common/components/NavMenuItem/NavMenuItem';
import { useAppDispatch, useAppSelector } from '../../redux';
import missionUploadApi from '../../redux/api/mission-upload';
import { updateActiveNavMenuItem } from '../../redux/features/modal-control.slice';
import { NavMenuItemEnum } from '../../types';

import {
  loadMissionUploadFilesBtn,
  mainStyle,
  sidebarStyle,
} from './board.style';
import { getUncheckedFileList } from '../../../../utils/files';
import MissionUploadFileList from './MissionUploadFileList';

type MenuItemProps = {
  menuItemClassName: NavMenuItemEnum;
  label: string;
};

function MenuItemContainer({ label, menuItemClassName }: MenuItemProps) {
  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  const dispatch = useAppDispatch();
  const className = classNames({
    'is-active': menuItemClassName === activeNavMenuItem,
  });
  const handleClick = () => {
    dispatch(updateActiveNavMenuItem(menuItemClassName));
  };
  return (
    <NavMenuItem
      label={label}
      className={className}
      handleClick={handleClick}
    />
  );
}

export default function Board() {
  const [trigger, queryResult] = missionUploadApi.useLazyGetAllQuery();
  const { data: missionFiles, isSuccess } = queryResult;

  const menuItems = [
    { label: '팀 비밀번호', menuItemClassName: NavMenuItemEnum.TeamPassword },
    { label: '타이머', menuItemClassName: NavMenuItemEnum.Timer },
    { label: '이미지설정', menuItemClassName: NavMenuItemEnum.Upload },
    { label: '구역설정', menuItemClassName: NavMenuItemEnum.PuzzleSetting },
    { label: '구역점유현황', menuItemClassName: NavMenuItemEnum.PuzzleStatus },
    { label: '본부 점수 제공', menuItemClassName: NavMenuItemEnum.TeamPoint },
    { label: '최종결과', menuItemClassName: NavMenuItemEnum.Statistics },
    { label: '점수배정표', menuItemClassName: NavMenuItemEnum.PointTable },
    {
      label: '관리자 비밀번호',
      menuItemClassName: NavMenuItemEnum.AdminPassword,
    },
    { label: '초기화', menuItemClassName: NavMenuItemEnum.Reset },
  ];

  const handleMissionFilesLoadBtnClick = () => {
    trigger()
      .unwrap()
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Row>
      <div className="board">
        <div className="sidebar" css={sidebarStyle}>
          <ul className="nav-menu list-unstyled">
            {menuItems.map(({ menuItemClassName, label }) => {
              return (
                <MenuItemContainer
                  label={label}
                  menuItemClassName={menuItemClassName}
                  key={menuItemClassName}
                />
              );
            })}
          </ul>
        </div>
        <div className="main" css={mainStyle}>
          {isSuccess && missionFiles && missionFiles.length > 0 && (
            <MissionUploadFileList
              missionFiles={getUncheckedFileList(missionFiles)}
            ></MissionUploadFileList>
          )}
          <Button
            css={loadMissionUploadFilesBtn}
            variant="primary"
            onClick={handleMissionFilesLoadBtnClick}
          >
            미션 업로드 파일 불러오기
          </Button>
        </div>
      </div>
    </Row>
  );
}
