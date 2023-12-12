import cls from 'classnames';
import moment from 'moment';

import styles from './index.less';

import moreSvg from './icons/more.svg';

import { MESSAGE_TYPE_IMAGE, MESSAGE_TYPE_TEXT } from '@/constants';

const MessageView = ({ content, isSender, sendTime, type, ...rest }) => {
  console.log('MessageView :: ', rest);

  const textStyles = cls(styles['text-message-view'], {
    [styles.sender]: isSender,
    [styles.receiver]: !isSender,
  });

  const popMenuStyles = cls(styles['show-popmenu'], {
    [styles.sender]: isSender,
    [styles.receiver]: !isSender,
  });

  const bubbleStyles = cls(styles.bubble, {
    [styles.sender]: isSender,
    [styles.receiver]: !isSender,
  });

  const messageTimeStyle = cls(styles['message-time'], {
    [styles.sender]: isSender,
    [styles.receiver]: !isSender,
  });

  const renderPopuMenu = () => {
    return (
      <div className={popMenuStyles}>
        <img src={moreSvg} />
      </div>
    );
  };

  const renderMessageView = () => {
    // 文本消息
    if (type === MESSAGE_TYPE_TEXT) {
      return <div className={styles['text-item']}>{content}</div>;
    }

    // 图片消息
    if (type === MESSAGE_TYPE_IMAGE) {
      return (
        <div className={styles['image-item']}>
          <img src={content} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={textStyles}>
      <div className={styles['text-message-wrapper']}>
        <div className={messageTimeStyle}>{moment(sendTime).format('LTS')}</div>
        <div className={bubbleStyles}>
          {isSender && renderPopuMenu()}
          {renderMessageView()}
          {!isSender && renderPopuMenu()}
        </div>
      </div>
    </div>
  );
};

export default MessageView;
