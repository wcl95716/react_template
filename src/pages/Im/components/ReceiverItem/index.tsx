import { Avatar } from 'antd';
import MessageView from '../MessageView';
import styles from './index.less';

const avatarStyle = { backgroundColor: '#005EFF', verticalAlign: 'middle' };

const ReceiverItem = ({ userName, item }) => {
  return (
    <div className={styles['receiver-item']}>
      {/* receiver */}
      <div className={styles['avatar-wrap']}>
        <Avatar size="large" style={avatarStyle}>
          {userName}
        </Avatar>
      </div>
      <MessageView isSender={false} {...item} />
    </div>
  );
};

export default ReceiverItem;
