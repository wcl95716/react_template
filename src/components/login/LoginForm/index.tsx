import React, { Fragment, useState } from 'react';
import { connect } from 'umi';
import { Form, Button, Checkbox, Tabs, Input, Alert } from 'antd';

const LoginForm: React.FC<any> = (props) => {
  const [type, setType] = useState('account');

  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;

  const handleSubmit = (values: any) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  return (
    <Form
      initialValues={{ autoLogin: true, userName: '江景', password: '123' }}
      name="basic"
      onFinish={onFinish}
    >
      <Tabs
        activeKey={type}
        onChange={setType}
        items={[
          { key: 'account', label: '账户密码登录' },
          { key: 'mobile', label: '手机号登录' },
        ]}
      ></Tabs>

      {status === 'error' && (loginType === 'account' || loginType === 'mobile') && !submitting && (
        <Alert
          style={{ marginBottom: 24 }}
          message={loginType === 'mobile' ? '验证码错误' : '账户或密码错误'}
          type="error"
          showIcon
        />
      )}

      {type === 'account' && (
        <Fragment>
          <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        </Fragment>
      )}

      {type === 'mobile' && (
        <Fragment>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1\d{10}$/, message: '手机号格式错误' },
            ]}
          >
            <Input autoComplete="off" placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="smsCode"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Input placeholder="请输入验证码" />
          </Form.Item>
        </Fragment>
      )}

      <Form.Item>
        <Checkbox name="autoLogin">自动登录</Checkbox>
        <label>忘记密码</label>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(LoginForm);
