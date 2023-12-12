import React from 'react';

import moment from 'moment';

import { ReactComponent as BookFill } from '@/assets/svg/book-fill.svg';
import { ReactComponent as EditEvent } from '@/assets/svg/edit-event.svg';
import { ReactComponent as UserFill } from '@/assets/svg/user-fill.svg';
import { ReactComponent as Like } from '@/assets/svg/like.svg';

import BookWatched from './BookWatched';
import DocUpdated from './DocUpdated';
import UserFollowed from './UserFollowed';

import './index.less';

const DynamicItem: React.FC<any> = ({ item }) => {
  const renderDynamicItemTop = () => {
    let DotIcon = BookFill;
    let dynamicText = '';
    switch (item.event_type) {
      case 'publish_doc':
        DotIcon = EditEvent;
        if (item.subject_type === 'Doc') dynamicText = '发布了话题';
        if (item.subject_type === 'Book') dynamicText = '发布了文档';
        break;
      case 'update_doc':
        DotIcon = EditEvent;
        dynamicText = '更新了文档';
        break;
      case 'watch_book':
        DotIcon = BookFill;
        dynamicText = '关注了知识库';
        break;
      case 'like_doc':
        DotIcon = Like;
        dynamicText = '点赞了文档';
        break;
      case 'follow_user':
        DotIcon = UserFill;
        dynamicText = '关注了用户';
        break;
      default:
        DotIcon = EditEvent;
        dynamicText = '发布了文档';
        break;
    }
    return (
      <div className="dynamic-top">
        <span className="dot-icon">
          <DotIcon width={16} height={16} />
        </span>
        {dynamicText && <span>{dynamicText}</span>}
        <span className="time">{moment(item.created_at).format('MM-DD')}</span>
      </div>
    );
  };

  const renderDynamicBottom = () => {
    return (
      <div className="dynamic-bottom">
        {(item.event_type === 'watch_book' || item.event_type === 'like_doc') && (
          <BookWatched
            name={item.subject.name || item.subject.title}
            description={item.subject.description}
            watchesCount={item.subject.watches_count}
            eventType={item.event_type}
            user={item.subject.user}
          />
        )}

        {(item.event_type === 'update_doc' || item.event_type === 'publish_doc') && (
          <DocUpdated
            cover={true}
            name={item.subject.title}
            book={item.book.name}
            description={item.subject.description}
          />
        )}

        {item.event_type === 'follow_user' && (
          <UserFollowed name={item.subject.name} description={item.subject.description} />
        )}
      </div>
    );
  };

  return (
    <div className="dynamic-item">
      {renderDynamicItemTop()}
      {renderDynamicBottom()}
    </div>
  );
};

export default DynamicItem;
