import { parse, stringify } from 'querystring';

import { MOOSE_REACT_LEARN_ACCESS_TOKEN } from '@/constants';
import { history } from 'umi';
import { isEmpty } from 'lodash';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

// 保存
export const saveAccessToken = (token: string) => {
  localStorage.setItem(MOOSE_REACT_LEARN_ACCESS_TOKEN, token);
};

// 获取
export const getAccessToken = () => {
  return localStorage.getItem(MOOSE_REACT_LEARN_ACCESS_TOKEN);
};

// 移除
export const removeAccessToken = () => {
  localStorage.removeItem(MOOSE_REACT_LEARN_ACCESS_TOKEN);
};

// 封装参数放到请求头中
export const getAuthorization = () => {
  let accessToken = getAccessToken();
  return isEmpty(accessToken)
    ? {}
    : {
        Authorization: `Bearer ${getAccessToken()}`,
      };
};

// 为登录时，重定向到 登录界面
export const redirectLogin = () => {
  const { redirect } = getPageQuery(); // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    removeAccessToken();
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: window.location.href,
      }),
    });
  }
};

/**
 *  区分聊天对象和当前登录用户对比
 * @param {*} chatItem 聊天记录
 * @param {*} userId 当前登录用户 Id
 * @returns
 */
export const getDiffChatId = (chatItem: any, userId: string) => {
  const { sendId, receiveId } = chatItem;
  if (userId === sendId) {
    return receiveId;
  }
  if (userId === receiveId) {
    return sendId;
  }
  return '';
};
