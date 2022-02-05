import './scss/main.scss';
import { Form, Button } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../../auth/auth.hooks';
import toasty from '../../utils/toasty';
import { apiRequest } from '../../utils/axios-jwt';

export default function LoginPage() {
  const { login } = useAuth();
  const [companyImage, setCompanyImage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getCompanyImage = async () => {
      const {
        data: { optionValue: companyImage },
      } = await apiRequest({
        method: 'GET',
        url: 'options/company-image',
      });
      setCompanyImage(companyImage);
    };
    getCompanyImage();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = inputRef?.current?.value;
    if (!password) {
      toasty.error('비밀번호를 입력해 주세요');
      return;
    }
    await login(password);
  };

  const backgroundStyle = {
    backgroundImage: `url(${
      import.meta.env.VITE_ADMIN_UPLOADS
    }/${companyImage})`,
  };

  return (
    <div className="login-page">
      <div className="background-image" style={backgroundStyle}></div>
      <div className="login-form-wrapper">
        <Form className="login-form" onSubmit={handleSubmit}>
          <div className="d-grid gap-2">
            <Form.Control type="text" placeholder="비밀번호" ref={inputRef} />
            <Button type="submit" variant="primary">
              로그인
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
