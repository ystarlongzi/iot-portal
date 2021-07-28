import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Statistic, Form, Input, Row, Col, Button, message, Spin } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import {
  apiService,
  verifyCodeParamsEmail,
  verifyCodeParamsPhone,
} from '@tuya/connector';

const { Countdown } = Statistic;
const { getVerifyCode } = apiService;

interface IProps {
  params: verifyCodeParamsPhone | verifyCodeParamsEmail;
  isValid: () => boolean;
}

const VerifyCode = ({ params, isValid }: IProps) => {
  const { t, i18n } = useTranslation();

  const [deadline, setDeadline] = useState<number>(Date.now());
  const [loading, setLoading] = useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState(false);

  const sendCode = () => {
    if (!isValid()) {
      message.error(t('login.form.code.requireAccount'));
      return;
    }
    setLoading(true);
    getVerifyCode(params)
      .then(() => {
        setShowCountdown(true);
        setDeadline(Date.now() + 60 * 1000);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Row justify="space-between">
        <Col span={i18n.language === 'zh-CN' ? 15 : 13}>
          <Form.Item
            name="validateCode"
            rules={[
              { required: true, message: t('login.form.code.require') },
              {
                len: 6,
                message: t('login.form.code.len'),
              },
            ]}
          >
            <Input
              type="text"
              autoComplete="new-password"
              prefix={<MailOutlined />}
              placeholder={t('login.form.code.placeholder')}
            />
          </Form.Item>
        </Col>
        <Col style={{ color: '#666' }}>
          {showCountdown ? (
            <Button disabled>
              <div>
                <Row>
                  <Col>{t('login.form.code.countdown')}</Col>
                  <Col>
                    <Countdown
                      format="ss"
                      value={deadline}
                      suffix="s"
                      onFinish={() => {
                        setShowCountdown(false);
                      }}
                      valueStyle={{
                        fontSize: 14,
                        width: 40,
                        color: 'rgba(0, 0, 0, 0.25)',
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Button>
          ) : (
            <Spin spinning={loading}>
              <Button onClick={sendCode}>
                {t('login.form.code.getCode')}
              </Button>
            </Spin>
          )}
        </Col>
      </Row>
    </>
  );
};

export default VerifyCode;
