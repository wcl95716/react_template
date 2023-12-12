import { request } from 'umi';

export async function postAccountLogin(params) {
  return request('/api/v1/account/login', {
    method: 'POST',
    // 添加 使用 application/x-www-form-urlencoded
    requestType: 'form',
    data: params,
  });
}
export async function getSmsCaptcha(params) {
  return request(`/api/v1/sms/send`, {
    method: 'POST',
    requestType: 'form',
    data: params,
  });
}
