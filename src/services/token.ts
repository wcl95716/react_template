import { request } from 'umi';

export async function postRefreshToken() {
  return request('/api/v1/token/refresh', {
    method: 'POST',
    requestType: 'form',
    data: {
      accessToken: 'AccessToken',
    },
  });
}
