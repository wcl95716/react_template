import { getMessageChatList, getMessageRecordList } from '@/services/chat';

const ChatModel = {
  namespace: 'chat',

  state: {
    // 当前聊天对象
    chatUserInfo: {},
    // 输入聊天信息
    content: '',
    // 聊天详情
    messageChatList: [
      {
        msgId: '7751131831315698898',
        sendId: '775113183131074580',
        content: '你吃饭了吗？',
      },
      {
        msgId: '7751133655565656565',
        sendId: '801901013480247300',
        content: '黄河之水天上来。',
      },
    ],
    // 最近聊天列表
    messageRecordList: [
      {
        msgId: '775113183131069599',
        sendId: '801901013480247300',
        receiveId: '775113183131074580',
        type: '1',
        chatType: '1',
        sendTime: '2021-03-09',
        content: '黄河之水天上来。',
      },
    ],

    pageNum: 1,

    hasMore: true,
  },

  effects: {
    *getMessageRecordList(_, { call, put }) {
      const response = yield call(getMessageRecordList);
      if (response.code === 200) {
        const lists = (response.data && response.data.lists) || [];
        yield put({
          type: 'updateMessageRecordList',
          payload: {
            messageRecordList: lists,
          },
        });
      }
    },

    /**
     * 获取聊天请求
     */
    *getMessageChatList({ payload }, { call, put, select }) {
      const { chatId, pageNum } = payload;

      const chatState = yield select((state) => state.chat);
      const { messageChatList = [] } = chatState;

      const response = yield call(getMessageChatList, { chatId, pageNum });
      if (response.code === 200) {
        const lists = (response.data && response.data.lists) || [];
        // 数据反转，无需遍历添加
        lists.reverse();

        const messageList = pageNum !== 1 ? lists.concat(messageChatList) : lists;
        yield put({
          type: 'updateMessageChatList',
          payload: { messageChatList: messageList, pageNum, hasMore: lists.length > 0 },
        });
      }
    },

    *sendMessage({ payload }, { put, select }) {
      const { messageTemplate } = payload;
      const chatState = yield select((state) => state.chat);

      const { messageChatList = [], socket } = chatState;

      const temp = messageChatList.concat();
      temp.push(messageTemplate);
      yield put({ type: 'refreshChatList', payload: { messageChatList: temp } });
      yield put({ type: 'chatInputMessageChange', payload: { content: null } });

      if (!socket) console.warn('socket 不存在，需要重新登录，请检查 Socket 连接。');
      if (socket) socket.emit('SINGLE_CHAT', messageTemplate);

      // 更新聊天记录列表

      // 方法一、从新调用获取
      yield put({ type: 'getMessageRecordList' });

      // 方法二、在接收到消息到时候更新

      // 方法三、查找现有列表 更新对应字段
      // const { sendId, receiveId } = messageTemplate;
      // let recordIndex = -1;
      // messageRecordList.map((item, index) => {
      //   if (
      //     (item.sendId === sendId && item.receiveId === receiveId) ||
      //     (item.receiveId === sendId && item.sendId === receiveId)
      //   ) {
      //     recordIndex = index;
      //   }
      // });
      // if (recordIndex !== -1) {
      //   messageRecordList[recordIndex]
      // }
      // console.log(recordIndex);

      console.log(chatState);
    },

    *receiverMessage({ payload }, { put, select }) {
      const { message } = payload;
      const chatState = yield select((state) => state.chat);
      const { messageChatList = [] } = chatState;
      const temp = messageChatList.concat();
      temp.push(JSON.parse(message));
      yield put({ type: 'refreshChatList', payload: { messageChatList: temp } });
    },
  },

  reducers: {
    // 当前和那个聊天
    chatCurrentUser(state, { payload: { chatUserInfo } }) {
      return { ...state, chatUserInfo };
    },

    // 刷新聊天列表
    refreshChatList(state, { payload: { messageChatList } }) {
      return { ...state, messageChatList };
    },

    // 输入消息改变时
    chatInputMessageChange(state, { payload: { content } }) {
      return { ...state, content };
    },

    saveServerInfo(state, { payload: { socket } }) {
      return { ...state, socket };
    },

    /**
     * 更新聊天记录列表
     */
    updateMessageRecordList(state, { payload: { messageRecordList } }) {
      return { ...state, messageRecordList };
    },

    /**
     * 更新当前聊天列表
     */
    updateMessageChatList(state, { payload: { messageChatList = [], pageNum, hasMore } }) {
      return {
        ...state,
        messageChatList: messageChatList.length <= 0 ? state.messageChatList : messageChatList,
        pageNum,
        hasMore,
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      history.listen(() => {});
    },
  },
};
export default ChatModel;
