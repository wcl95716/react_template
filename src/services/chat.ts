import { request } from 'umi';

export async function getMessageRecordList(params) {
  return request('/api/v1/message/record/list', {
    method: 'POST',
    requestType: 'form',
    data: params,
  });
}

export async function getMessageChatList(params) {
  return request('/api/v1/message/chat/list', {
    method: 'POST',
    requestType: 'form',
    data: params,
  });
}
