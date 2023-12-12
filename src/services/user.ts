import { request } from 'umi';

export async function queryUsers() {
  return request('/api/users');
}

export async function queryCurrent(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/v1/user/info', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function getNotices() {
  return request('/api/v1/notices');
}
