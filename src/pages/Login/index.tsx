import React, { useState } from 'react';
import { Card, Space } from 'antd';
import { QqOutlined, WechatOutlined, WeiboCircleOutlined } from '@ant-design/icons';

import { FormattedMessage } from 'umi';

import cls from 'classnames';

import LoginForm from '@/components/Login/LoginForm';
import ScanQRCode from '@/components/Login/ScanQRCode';

import QRcodeMaskIcon from './icons/qrcode-mark.svg';
import AccountMaskIcon from './icons/account-mask.svg';

import styles from './index.less';

const LoginPage: React.FC = () => {
  const [isAccount, setAccount] = useState(true);

  const mainClassName = cls(styles.main, {
    [styles.login]: isAccount,
    [styles.qrcode]: !isAccount,
  });
  return (
    <div className={mainClassName}>
      <Card>
        <div className={styles['login-form']}>
          <LoginForm />
        </div>

        {!isAccount && (
          <div className={styles['scan-qrcode']}>
            <ScanQRCode />
          </div>
        )}
        <Space>
          <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
          <WechatOutlined className={styles.icon} />
          <QqOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
        </Space>

        <div className={styles.qrCodeMask} onClick={() => setAccount(!isAccount)}>
          <img src={isAccount ? QRcodeMaskIcon : AccountMaskIcon} alt="二维码登录" />
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
