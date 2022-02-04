import { useEffect, useRef } from 'react';
import { Button, Col, FormControl, Modal, Row } from 'react-bootstrap';
import { NavMenuItemEnum } from '../../../../types';
import { getFileExtension } from '../../../../utils/files';
import { useAppSelector } from '../../redux';
import optionApi from '../../redux/api/option.api';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

export default function UploadModal() {
  const companyImageObj = optionApi.useGetCompanyImageQuery();
  const [uploadCompanyImage] = optionApi.useUploadCompanyImageMutation();
  const mapImageObj = optionApi.useGetMapImageQuery();
  const [uploadMapImage] = optionApi.useUploadMapImageMutation();
  const companyImageInputRef = useRef<HTMLInputElement>(null);
  const mapImageInputRef = useRef<HTMLInputElement>(null);
  const handleCompanyImageInput = async (e: any) => {
    const companyImage = e.target.files[0];
    const fd = new FormData();
    const fileExtension = getFileExtension(companyImage.name);
    const fileName = `company-image.${fileExtension}`;
    fd.append('image', companyImage, fileName);
    try {
      await uploadCompanyImage(fd);
    } catch (e: any) {
      console.log('e :', e);
    }
  };
  const handleMapImageInput = async (e: any) => {
    const mapImage = e.target.files[0];
    const fd = new FormData();
    const fileExtension = getFileExtension(mapImage.name);
    const fileName = `map-image.${fileExtension}`;
    fd.append('image', mapImage, fileName);
    try {
      await uploadMapImage(fd);
    } catch (e: any) {
      console.log('e :', e);
    }
  };

  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  useEffect(() => {
    companyImageObj.refetch();
    mapImageObj.refetch();
  }, [activeNavMenuItem]);

  return (
    <CustomModal
      size="lg"
      className="upload-modal"
      navMenuItem={NavMenuItemEnum.Upload}
    >
      <Modal.Header>이미지 설정</Modal.Header>
      <Modal.Body>
        <div>회사 이미지 업로드</div>
        <Row className="company-image-upload justify-content-between mb-3">
          <Col className="d-flex align-items-center">
            <FormControl
              className="d-none"
              type="file"
              ref={companyImageInputRef}
              onChange={handleCompanyImageInput}
            />
            <Button
              className="align-self-center"
              variant="success"
              type="submit"
              onClick={() => {
                companyImageInputRef.current?.click();
              }}
            >
              파일 선택
            </Button>
          </Col>
          <Col className="flex-grow-0">
            <div className="preview">
              <img
                src={`/public/uploads/admin/${companyImageObj.data?.optionValue}`}
              />
            </div>
          </Col>
        </Row>
        <div>전체지도 업로드</div>
        <Row className="map-image-upload justify-content-between">
          <Col className="d-flex align-items-center">
            <FormControl
              className="d-none"
              type="file"
              ref={mapImageInputRef}
              onChange={handleMapImageInput}
            />
            <Button
              className="align-self-center"
              variant="success"
              type="submit"
              onClick={() => {
                mapImageInputRef.current?.click();
              }}
            >
              파일 선택
            </Button>
          </Col>
          <Col className="flex-grow-0">
            <div className="preview">
              <img
                src={`/public/uploads/admin/${mapImageObj.data?.optionValue}`}
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
