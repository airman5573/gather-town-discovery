/** @jsxImportSource @emotion/react */
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toasty from '../../../../../utils/toasty';
import puzzleApi from '../../../../admin/redux/api/puzzle.api';
import { inputGroup } from './style';

type TProps = {
  team: number;
};

export default function DescryptSentenceInput({ team }: TProps) {
  const { register, handleSubmit, reset } = useForm<{ sentence: string }>();
  const [submitSentence] = puzzleApi.useSubmitMutation();
  const handleSentenceSubmit = ({ sentence }: { sentence: string }) => {
    submitSentence({ team, sentence })
      .unwrap()
      .then(({ rank }) => {
        toasty.success(`${rank}등으로 암호를 해독했습니다`);
      })
      .catch((e) => {
        const { message } = e.data;
        toasty.error(Array.isArray(message) ? message[0] : message);
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <Form onSubmit={handleSubmit(handleSentenceSubmit)}>
      <InputGroup className="mb-4" css={inputGroup}>
        <InputGroup.Text>암호해독</InputGroup.Text>
        <Form.Control
          {...register('sentence')}
          placeholder="해독한 암호를 입력해주세요"
        ></Form.Control>
        <Button type="submit" variant="primary">
          제출
        </Button>
      </InputGroup>
    </Form>
  );
}
