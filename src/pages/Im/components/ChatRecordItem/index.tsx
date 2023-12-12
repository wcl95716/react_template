import { Avatar, Divider } from 'antd';
import { initFriendList } from '@/mock/userList';

import moment from 'moment';
import cls from 'classnames';

import styles from './index.less';
/**
 * 聊天记录 item
 *
 * @param {*} param0
 * @returns
 */
const ChatRecordItem = ({ chatId, sendTime, type, content, selected, onClick }) => {
  const [userInfo] = initFriendList.filter((item) => item.userId === chatId);
  if (!userInfo) return null;
  const selectedClassName = styles['chat-record-item-selected'];

  const renderMessageDetail = () => {
    let message = content;
    if (type === 'MS:IMAGE') {
      message = '[图片]';
    }

    return <p className={styles['chat-message-detail']}>{message}</p>;
  };

  return (
    <div>
      <div
        className={cls(styles['chat-record-item'], {
          [selectedClassName]: selected,
        })}
        onClick={onClick}
      >
        <div className={styles['chat-user-avatar']}>
          <Avatar src="https://moose-plus.oss-cn-shenzhen.aliyuncs.com/avatar/avatar%20%281%29.jpeg" />
        </div>
        <div className={styles['chat-user-info']}>
          <div className={styles.top}>
            <p className={styles['chat-user-name']}>{userInfo.userName || ''}</p>
            <span className={styles.time}>{moment(sendTime).format('LTS')}</span>
          </div>
          <div className={styles['chat-message-detail-item']}>{renderMessageDetail()}</div>
        </div>
      </div>
      <Divider style={{ margin: 0 }} />
    </div>
  );
};

export default ChatRecordItem;
