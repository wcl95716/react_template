import { queryCurrent, queryUsers } from '@/services/user';

import { DETAULT_AVATAR } from '@/mock/avatar';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
      avatar: DETAULT_AVATAR,
      userName: '江景',
    },

    userList: [{ id: 1, name: '江景' }],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response && response.code === 200 ? response.data : {},
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },

    // 添加用户
    add(state, { payload: { user } }) {
      const { userList = [] } = state;
      const temp = userList.concat();
      temp.push({ id: userList.length + 1, ...user });
      return {
        ...state,
        userList: temp,
      };
    },

    // 删除用户
    delete(state, { payload: id }) {
      const { userList = [] } = state;
      return {
        ...state,
        userList: userList.filter((item) => item.id !== id),
      };
    },
  },
};
export default UserModel;
