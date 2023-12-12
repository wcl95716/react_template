import { history } from 'umi';
import { message } from 'antd';
import { postAccountLogin } from '@/services/login';
import { stringify } from 'querystring';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      // 解构参数
      const { password, type, userName, phone, smsCode } = payload;
      // 从新拼装参数
      const params = {};
      if (type === 'account') {
        params.accountName = userName;
        params.loginType = 'password';
        params.password = password;
      } else {
        params.phone = phone;
        params.loginType = 'sms_code';
        params.smsCode = smsCode;
      }

      // 提交处理后的参数
      const response = yield call(postAccountLogin, params);
      yield put({ type: 'changeLoginStatus', payload: response }); // Login successfully
      if (response && response.code === 200) {
        saveAccessToken(response.data);

        const urlParams = new URL(window.location.href);
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = getPageQuery();

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/login' && !redirect) {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // TODO：MOCK 设置默认权限
      setAuthority('admin');
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
