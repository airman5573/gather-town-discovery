/** @jsxImportSource @emotion/react */
import optionApi from '../../../../admin/redux/api/option.api';
import { NavMenuItemEnum } from '../../../types';
import PageWrapper from '../PageWrapper';
import { imageContainerStyle } from './style';

export default function MapPage() {
  const { data } = optionApi.useGetMapImageQuery();
  return (
    <PageWrapper className="map-page" navMenuItem={NavMenuItemEnum.Map}>
      <div className="image-container" css={imageContainerStyle}>
        <img
          src={`${import.meta.env.VITE_ADMIN_UPLOADS}/${data?.optionValue}`}
          alt=""
        />
      </div>
    </PageWrapper>
  );
}
