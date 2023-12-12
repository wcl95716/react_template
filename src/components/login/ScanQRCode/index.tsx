/* eslint-disable global-require */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Spin, Typography } from 'antd';
import QRCodeView from 'qrcode.react';

import { askQRCodeStatus, getQRCode } from '@/services/qrcode';

import styles from './index.less';

import QrcodeSuccessIcon from './icons/qrcode_success.svg';
import QrcodeErrorIcon from './icons/qrcode_error.svg';

const { Title } = Typography;

const ScanQRCode = () => {
  // 'https://moose-plus.oss-cn-shenzhen.aliyuncs.com/full-stack.jpg'
  const [qrCode, setQRCode] = useState('');
  const [qrScanSuccess, setQRScanSuccess] = useState(false);
  const [qrScanError, setQRScanWError] = useState(false);
  const [qrExpired, setQRExpired] = useState(false);

  const [isLoadQRCode, setLoadQRCode] = useState(true);

  const askTimer = useRef();
  const handleAskQRCode = useCallback(() => {
    if (askTimer && askTimer.current !== null) clearInterval(askTimer.current);

    setQRScanWError(false);
    setQRExpired(false);

    askTimer.current = setInterval(() => {
      askQRCodeStatus()
        .then((res) => {
          if (res.code === 200) {
            if (res.data && res.data.status === 1) {
              setQRScanSuccess(true);
            }
            // TODO: 获取到 token 进行跳转
          } else {
            // 扫描二维码出现异常
            setQRCode('');
            setQRScanSuccess(false);

            if (askTimer && askTimer.current !== null) clearInterval(askTimer.current);

            // 30003, "获取二维码失败"
            if (res.code === 30003) {
              setQRScanWError(true);
            } else {
              // 30002, "重新获取二维码"
              setQRExpired(true);
            }
          }
        })
        .catch(() => {});
    }, 1500);
  }, []);

  const handleGetQRCode = useCallback(() => {
    setLoadQRCode(true);
    getQRCode()
      .then((res) => {
        if (res.code === 200) {
          if (res.data && res.data.codeUrl) {
            setQRCode(res.data.codeUrl);
            setLoadQRCode(false);
            handleAskQRCode();
          }
        }
      })
      .catch(() => {
        setQRScanWError(true);
      })
      .finally(() => {
        setQRScanSuccess(false);
        setLoadQRCode(false);
      });
  }, [handleAskQRCode]);

  const handleRetryGetQRCode = () => {
    handleGetQRCode();
  };

  useEffect(() => {
    handleGetQRCode();
    return () => {
      if (askTimer && askTimer.current !== null) clearInterval(askTimer.current);
    };
  }, [handleGetQRCode]);

  return (
    <div className={styles['qrcode-view']}>
      <Title level={3}>扫码登录</Title>
      {isLoadQRCode ? (
        <div className={styles.spin}>
          <Spin className={styles['ant-spin-spinning']} />
        </div>
      ) : (
        <div className={styles.qrcode}>
          {qrCode === '' && (qrScanError || qrExpired) ? (
            <div className={styles['qrcode-error']}>
              <img src={QrcodeErrorIcon} />
              {(qrScanError || qrExpired) && (
                <div className={styles['retry-qrcode']}>
                  {qrExpired ? <p>二维码已过期</p> : <p>获取二维码异常</p>}
                  <span className={styles.retry} onClick={handleRetryGetQRCode}>
                    重新获取
                  </span>
                </div>
              )}
            </div>
          ) : (
            <QRCodeView
              size={180}
              renderAs="svg"
              value={qrCode}
              imageSettings={{
                height: 40,
                width: 40,
                src: 'https://moose-plus.oss-cn-shenzhen.aliyuncs.com/full-stack.jpg',
              }}
            />
          )}
          {qrScanSuccess && (
            <div className={styles['qrcode-success']}>
              <img className={styles['success-img']} src={QrcodeSuccessIcon} alt="" />
              <span className={styles['success-text']}>扫码成功</span>
              <span className={styles['success-login']}> 请在 Moose 中选择登录</span>
              <span className={styles['success-retry']} onClick={handleRetryGetQRCode}>
                重新扫码
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ScanQRCode;
