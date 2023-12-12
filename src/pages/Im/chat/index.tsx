import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import { connect } from 'dva';
import { history } from 'umi';

import { Button, Input, Spin, message } from 'antd';

import ChatOperatorView from '../components/ChatOperatorView';
import ReceiverItem from '../components/ReceiverItem';
import SenderItem from '../components/SenderItem';

import { getDiffChatId } from '@/utils/utils';
import { initFriendList } from '@/mock/userList';
import { scrollToBottom } from '@/utils/scroller';

import styles from './index.less';
import { CHAT_TYPE_SINGLE, MESSAGE_TYPE_TEXT } from '@/constants';

// cross-env PORT=80

const ChatPage: React.FC<any> = ({ chat, dispatch, user, loading }) => {
  const { content, chatUserInfo } = chat;

  const { messageChatList, pageNum, hasMore } = chat;
  const { currentUser } = user;
  const { userId, userName } = currentUser;

  const receiveId = getDiffChatId(chatUserInfo, userId);

  const onSendMessage = () => {
    if (!receiveId) {
      message.error('请选择聊天对象');
      return;
    }

    if (!content) {
      return;
    }

    const messageTemplate = {
      type: MESSAGE_TYPE_TEXT,
      chatType: CHAT_TYPE_SINGLE,
      content,
      sendId: userId,
      receiveId,
    };
    dispatch({ type: 'chat/sendMessage', payload: { messageTemplate } });
    scrollToBottom('bottomElement', 'chatItems');
  };

  const onMessageInputChange = (msg) => {
    dispatch({ type: 'chat/chatInputMessageChange', payload: { content: msg } });
  };

  const onChatItemScroll = (e) => {
    if (!hasMore || loading) return;

    if (e.wheelDelta > 0) {
      const chatItems = document.getElementById('chatItems');
      if (chatItems && chatItems.scrollTop === 0) {
        // 获取当前聊天对象聊天记录
        const chatId = getDiffChatId(chatUserInfo, userId);
        dispatch({ type: 'chat/getMessageChatList', payload: { chatId, pageNum: pageNum + 1 } });
      } else {
        console.log('follow @全栈技术部 thank');
      }
    }
  };

  const addChatItemScrollListener = () => {
    const chatItems = document.getElementById('chatItems');
    // eslint-disable-next-line no-unused-expressions
    chatItems && chatItems.addEventListener('mousewheel', onChatItemScroll, false);
  };

  const removeChatItemScrollListener = () => {
    const chatItems = document.getElementById('chatItems');
    // eslint-disable-next-line no-unused-expressions
    chatItems && chatItems.removeEventListener('mousewheel', onChatItemScroll, false);
  };

  useEffect(() => {
    if (!receiveId) {
      // history.replace({ pathname: '/im' });
      return;
    }
    addChatItemScrollListener();
    // eslint-disable-next-line consistent-return
    return () => {
      removeChatItemScrollListener();
    };
  }, [pageNum, hasMore, loading]);
  console.log('onChatItemScroll chat :: ', pageNum, hasMore, loading);

  return (
    <div className={styles['chat-container']}>
      <div id="chatItems" className={styles['chat-items']}>
        {loading && (
          <div className={styles['chat-loading']}>
            <Spin />
          </div>
        )}
        {Array.isArray(messageChatList) &&
          messageChatList.map((item, index) => {
            // 判断发送者不是当前 用户 Id 就为接受者
            // 显示接受者视图
            // item.sendId !== userId
            const [userInfo] = initFriendList.filter((u) => u.userId === item.sendId);
            if (!userInfo) return null;
            return userInfo.userId !== userId ? (
              <div className={styles['chat-item']} key={item.messageId || index}>
                <ReceiverItem userName={userInfo.userName} item={item} />
              </div>
            ) : (
              <div className={styles['chat-item']} key={item.messageId || index}>
                <SenderItem userName={userName} item={item} />
              </div>
            );
          })}
        <Element name="bottomElement"></Element>
      </div>
      <div className={styles['chat-input-operator']}>
        <ChatOperatorView />
        <Input.TextArea
          placeholder="请输入消息"
          autoSize={{ minRows: 4, maxRows: 6 }}
          value={content}
          onChange={(e) => onMessageInputChange(e.target.value)}
        />
        <div className={styles['chat-send']}>
          <div className={styles['send-message-button']}>
            <Button type="primary" onClick={onSendMessage} disabled={!content}>
              发送
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ user, chat, loading }) => ({
  user,
  chat,
  loading: loading.models.chat,
}))(ChatPage);
