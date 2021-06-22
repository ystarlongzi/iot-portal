/**
 * 集成form的modal
 */
import { useState } from 'react';
import { Modal, Form } from 'antd';

const { useForm } = Form;

interface IProps {
  layout?: {
    labelCol?: {
      span?: number;
    };
    wrapperCol?: {
      span?: number;
    };
  };
  modalStatus: boolean;
  title: string;
  children: React.ReactNode;
  onConfirm: (values: any) => Promise<boolean>;
  onCancel?: () => void;
  showLoading?: boolean;
}

const baseLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const ModalForm = ({
  modalStatus = false,
  onConfirm = (values: any) => {
    return Promise.resolve(true);
  },
  onCancel = () => {},
  title = '',
  children,
  showLoading = false,
  layout = {},
}: IProps) => {
  const [form] = useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  return (
    <Modal
      destroyOnClose
      visible={modalStatus}
      title={title}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setConfirmLoading(true);
            onConfirm(values).then(() => {
              setConfirmLoading(false);
              form.resetFields();
            });
          })
          .catch((info) => {
            console.error('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} preserve={false} {...baseLayout} {...layout}>
        {children}
      </Form>
    </Modal>
  );
};

export default ModalForm;
