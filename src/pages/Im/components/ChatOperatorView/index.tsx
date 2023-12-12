import React, { useState } from 'react';
import { connect } from 'dva';

import EmoticonView from '../EmoticonView';

import { getDiffChatId } from '@/utils/utils';
import { scrollToBottom } from '@/utils/scroller';
import { CHAT_TYPE_SINGLE, MESSAGE_TYPE_IMAGE } from '@/constants';

import styles from './index.less';

const ChatOperatorView: React.FC<any> = ({ user, chat, dispatch }) => {
  console.log('ChatOperatorView :: ', user);

  const [operatorStatus, setOperatorStatus] = useState({
    emoji: false,
  });

  const { currentUser } = user;
  const { userId } = currentUser;

  const { chatUserInfo } = chat;

  const receiveId = getDiffChatId(chatUserInfo, userId);

  const onEmoticonVisibleChange = (emoji: any) => {
    setOperatorStatus({
      ...operatorStatus,
      emoji: emoji,
    });
  };

  const onChooseEmoji = (emoji: any) => {
    const messageTemplate = {
      type: MESSAGE_TYPE_IMAGE,
      chatType: CHAT_TYPE_SINGLE,
      content: emoji.path, // `${emoji.type}:${emoji.id}`,
      sendId: userId,
      receiveId,
    };
    console.log('onChooseEmoji :: ', emoji, messageTemplate);
    dispatch({ type: 'chat/sendMessage', payload: { messageTemplate } });
    scrollToBottom('bottomElement', 'chatItems');
    setOperatorStatus({
      ...operatorStatus,
      emoji: false,
    });
  };

  return (
    <div className={styles['chat-input-view']}>
      {/* 表情 */}
      <span className={styles.emoticon} title="表情">
        <EmoticonView
          operatorStatus={operatorStatus}
          onChooseEmoji={onChooseEmoji}
          onEmoticonVisibleChange={onEmoticonVisibleChange}
        />
      </span>
    </div>
  );
};

export default connect(({ user, chat, loading }) => ({
  user,
  chat,
  loading: loading.models.chat,
}))(ChatOperatorView);
