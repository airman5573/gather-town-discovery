import './scss/main.scss';
import { Form, Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import useAuth from '../../auth/auth.hooks';
import toasty from '../../utils/toasty';

export default function LoginPage() {
  const { login } = useAuth();
  const [companyImage, setCompanyImage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const getCompanyImage = async () => {
  //     const {
  //       data: { optionValue: companyImage },
  //     } = await apiRequest(API_URL.OPTIONS.COMPANY_IMAGE);
  //     setCompanyImage(companyImage);
  //   };
  //   getCompanyImage();
  // }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = inputRef?.current?.value;
    if (!password) {
      toasty.error('비밀번호를 입력해 주세요');
      return;
    }
    await login(password);
  };

  return (
    <div className="login-page">
      <div className="background-image"></div>
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
