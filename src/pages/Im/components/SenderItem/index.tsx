import { Avatar } from 'antd';
import MessageView from '../MessageView';
import styles from './index.less';

const avatarStyle = { backgroundColor: '#005EFF', verticalAlign: 'middle' };

const SenderItem = ({ userName, item }) => {
  return (
    <div className={styles['sender-item']}>
      {/* sender */}
      <MessageView isSender={true} {...item} />
      <div className={styles['avatar-wrap']}>
        <Avatar size="large" style={avatarStyle}>
          {userName}
        </Avatar>
      </div>
    </div>
  );
};

export default SenderItem;
