import { collectIcons, defaultEmojiIconGroup1 } from '../mock-emotion';

import { Tooltip } from 'antd';
import styles from './index.less';
import { useState } from 'react';

import defaultIcon from './icons/default.svg';
import collectIcon from './icons/collect.svg';
import emoticonIcon from './icons/emoticon.svg';

const DefaultEmoticonBox = ({ onEmojiItemClick }) => {
  return (
    <div className={styles['emoji-icons']}>
      {defaultEmojiIconGroup1.map((item) => {
        return (
          <Tooltip title={item.name} key={item.id}>
            <div className={styles['emoji-box']} onClick={() => onEmojiItemClick(item)}>
              <img className={styles['emoji-item']} src={item.path} alt={item.name} />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

const CollectEmotionBox = ({ onEmojiItemClick }) => {
  return (
    <div className={styles['collect-icons']}>
      {collectIcons.map((item) => {
        return (
          <Tooltip title={item.name} key={item.path}>
            <div className={styles.collect} onClick={() => onEmojiItemClick(item)}>
              <img src={item.path} alt={item.name} />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

/**
 * 表情面板
 *
 * @param {*} param0
 * @returns
 */
const EmoticonBox = ({ onEmojiItemClick }) => {
  const [emotionType, setEmotionType] = useState(0);
  return (
    <div className={styles['emoticon-box-tip-card']}>
      <span className={styles['emoticon-title']}>
        {emotionType === 0 ? '默认表情' : '收藏表情'}
      </span>
      <div className={styles['emoticon-box']}>
        {emotionType === 0 ? (
          <DefaultEmoticonBox onEmojiItemClick={onEmojiItemClick} />
        ) : (
          <CollectEmotionBox onEmojiItemClick={onEmojiItemClick} />
        )}
      </div>
      <div className={styles['emoticon-type']}>
        <Tooltip title="默认表情">
          <img src={defaultIcon} onClick={() => setEmotionType(0)} />
        </Tooltip>

        <Tooltip title="收藏表情" arrowContent={null}>
          <img className={styles.collect} src={collectIcon} onClick={() => setEmotionType(1)} />
        </Tooltip>
      </div>
    </div>
  );
};

const EmoticonView = ({ operatorStatus, onEmoticonVisibleChange, onChooseEmoji }) => {
  return (
    <Tooltip
      color="white"
      trigger="click"
      open={operatorStatus.emoji}
      overlayClassName={styles['emoticon-box-tip-tootip']}
      title={<EmoticonBox onEmojiItemClick={onChooseEmoji} />}
      onOpenChange={onEmoticonVisibleChange}
    >
      <img src={emoticonIcon} alt="" />
    </Tooltip>
  );
};

export default EmoticonView;
