import { useEffect } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';

import ChatRecordItem from './ChatRecordItem';

import { MOOSE_REACT_LEARN_ACCESS_TOKEN } from '@/constants';
import { redirectLogin, getDiffChatId } from '@/utils/utils';
import { scrollToBottom } from '@/utils/scroller';

import styles from './ChatLayout.less';

// cross-env PORT=80

const ChatLayout = ({ dispatch, children, chat, user }) => {
  const { currentUser } = user;
  const { userId } = currentUser;

  const { chatUserInfo, messageRecordList = [] } = chat;

  // 点击切换当前聊天对象
  const onChangeChatCurrentUser = (item: any) => {
    // 根据当前 sendId, receiveId, 判断当前聊天对象
    const chatId = getDiffChatId(item, userId);
    // 切换当前聊天对象
    dispatch({ type: 'chat/chatCurrentUser', payload: { chatUserInfo: item } });
    // 获取当前聊天对象聊天记录
    dispatch({ type: 'chat/getMessageChatList', payload: { chatId, pageNum: 1 } });
    scrollToBottom('bottomElement', 'chatItems');
  };

  const getMessageRecordList = () => {
    dispatch({ type: 'chat/getMessageRecordList' });
  };

  const connectImServer = () => {
    try {
      // 没有 token，调整登录界面
      const accessToken = localStorage.getItem(MOOSE_REACT_LEARN_ACCESS_TOKEN) || '';
      if (!accessToken) {
        redirectLogin();
        return;
      }

      // eslint-disable-next-line global-require
      const socket = require('socket.io-client')(`http://localhost:9000`, {
        transports: ['websocket'],
        query: { userId, access_token: accessToken },
      });
      socket.on('connect', () => {
        console.log('connect:: ');
        getMessageRecordList();
      });
      socket.on('error', (error: Error) => {
        console.log('error:: ', error);
      });
      socket.on('connect_error', (error: Error) => {
        console.log('connect_error:: ', error);
      });
      socket.on('disconnect', (reason: String) => {
        console.log('disconnect:: ', reason);
      });

      socket.on('SINGLE_CHAT', (message: String) => {
        console.log('客户端接收到消息: ', message);
        dispatch({ type: 'chat/receiverMessage', payload: { message } });
        scrollToBottom('bottomElement', 'chatItems');
      });

      dispatch({ type: 'chat/saveServerInfo', payload: { socket } });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectImServer();
    return () => {};
  }, []);

  return (
    <div className={styles['chat-layout-container']}>
      <div className={styles['chat-message-list']}>
        {messageRecordList.map((item) => {
          const chatId = getDiffChatId(item, userId);
          if (!chatId) return null;
          const currentChatId = getDiffChatId(chatUserInfo, userId);
          return (
            <Link to="/im/chat" key={item.msgId}>
              <ChatRecordItem
                {...item}
                chatId={chatId}
                selected={chatId === currentChatId}
                onClick={() => onChangeChatCurrentUser(item)}
              />
            </Link>
          );
        })}
      </div>
      <div className={styles['chat-message-content']}>{children}</div>
    </div>
  );
};

export default connect(({ chat, user }) => ({
  chat,
  user,
}))(ChatLayout);
