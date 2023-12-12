import { request } from 'umi';

export async function getQRCode() {
  return request('/api/v1/qrcode/get', {
    method: 'GET',
  });
}

export async function askQRCodeStatus() {
  return request('/api/v1/qrcode/ask', {
    method: 'GET',
  });
}
