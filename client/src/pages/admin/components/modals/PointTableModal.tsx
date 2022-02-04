import { useEffect } from 'react';
import { Alert, Form, Modal, Table, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavMenuItemEnum, PointTableKey } from '../../../../types';
import toasty from '../../../../utils/toasty';
import { useAppSelector } from '../../redux';
import pointTableApi from '../../redux/api/point-table.api';
import CustomModal from '../CustomModal';
import CustomModalFooter from '../CustomModalFooter';

type TPointTableRowProps = {
  name: string;
  pointTableKey: PointTableKey;
  point?: number;
};

type TPointFormValue = {
  point: number;
};

function PointTableRow({ name, pointTableKey, point }: TPointTableRowProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TPointFormValue>();
  const [updatePoint] = pointTableApi.useUpdatePointTableItemMutation();
  const handlePointSubmit = ({ point }: TPointFormValue) => {
    updatePoint({ key: pointTableKey, point })
      .unwrap()
      .then(() => {
        toasty.success(`점수를 업데이트 했습니다`);
        reset();
      })
      .catch((e) => {
        const { message } = e.data;
        toasty.error(message[0]);
      });
  };
  return (
    <tr>
      <td>{name}</td>
      <td>
        <Form onSubmit={handleSubmit(handlePointSubmit)}>
          <InputGroup>
            <Form.Control
              type="number"
              placeholder={`${point}`}
              {...register('point', {
                valueAsNumber: true,
              })}
            />
            <Button type="submit" variant="primary" size="sm">
              수정
            </Button>
          </InputGroup>
        </Form>
      </td>
    </tr>
  );
}

export default function PointTableModal() {
  const { data, refetch } = pointTableApi.useGetPointTableQuery();

  const { activeNavMenuItem } = useAppSelector((state) => state.modalControl);
  useEffect(() => {
    refetch();
  }, [activeNavMenuItem]);

  return (
    <CustomModal
      className="point-table-modal"
      navMenuItem={NavMenuItemEnum.PointTable}
    >
      <Modal.Header>점수배정표</Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            <tr>
              <th>항목</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            <PointTableRow
              name="시간점수 +30초당 얻는 점수"
              pointTableKey={PointTableKey.TimerPlus}
              point={data?.timerPlus}
            />
            <PointTableRow
              name="시간점수 -30초당 잃는 점수"
              pointTableKey={PointTableKey.TimerMinus}
              point={data?.timerMinus}
            />
            <PointTableRow
              name="업로드"
              pointTableKey={PointTableKey.Upload}
              point={data?.upload}
            />
            <PointTableRow
              name="구역오픈시 사용되는 점수"
              pointTableKey={PointTableKey.OpenBoxCost}
              point={data?.openBoxCost}
            />
            <PointTableRow
              name="글자가 없는 구역을 열었을때 얻는 점수"
              pointTableKey={PointTableKey.OpenEmptyBox}
              point={data?.openEmptyBox}
            />
            <PointTableRow
              name="글자가 있는 구역을 열었을때 얻는 점수"
              pointTableKey={PointTableKey.OpenLetterBox}
              point={data?.openLetterBox}
            />
            <PointTableRow
              name="구역을 연결했을때 얻는 점수"
              pointTableKey={PointTableKey.Bingo}
              point={data?.bingo}
            />
            <PointTableRow
              name="문장을 해독했을 때 얻는 점수"
              pointTableKey={PointTableKey.DescryptSentence}
              point={data?.descryptSentence}
            />
          </tbody>
        </Table>
        <Alert color="info">
          문장해독 점수 1등: 20000(기본점수), 2등: 16000, 3등: 13000, 4등:
          11000, 5등: 10000, 6등: 9000, 7등: 9000...(동일)
        </Alert>
      </Modal.Body>
      <CustomModalFooter />
    </CustomModal>
  );
}
