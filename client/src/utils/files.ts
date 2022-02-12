import { FILE_EXTENSIONS } from '../constants';
import { apiRequest } from './axios-jwt';

export function getFileExtension(filename: string) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function getMediaType(filename: string) {
  // file 확장자명 체크
  const extension = getFileExtension(filename).toLowerCase();
  for (let i = 0; i < FILE_EXTENSIONS.image.length; i += 1) {
    if (extension == FILE_EXTENSIONS.image[i]) {
      return 'image';
    }
  }
  for (let i = 0; i < FILE_EXTENSIONS.video.length; i += 1) {
    if (extension == FILE_EXTENSIONS.video[i]) {
      return 'video';
    }
  }

  return null;
}

export function upload(
  team: number,
  post: number,
  file: File,
  onUploadProgress: (progressEvent: any) => void,
) {
  const formData = new FormData();
  formData.append('mission-file', file);
  formData.append('team', `${team}`);
  formData.append('post', `${post}`);
  return apiRequest({
    url: '/mission-upload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
}
