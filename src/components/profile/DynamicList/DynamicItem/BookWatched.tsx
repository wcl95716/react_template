import React from 'react';

import { ReactComponent as BookTypeDefault } from '@/assets/svg/book-type-default.svg';

import './BookWatched.less';

const BookWatched: React.FC<any> = ({ name, description, watchesCount, eventType, user }) => {
  return (
    <div className="book-watched-item">
      <div className="book-detail">
        <div className="detail-info">
          <a href="/" className="book-link" target="_blank">
            <span className="book-title">
              <BookTypeDefault className="book-icon" width={20} heigth={20} />
              <span className="book-name">
                <span className="book-name-text">{name}</span>
              </span>
            </span>
          </a>
          {description && <p className="book-description">{description}</p>}
        </div>
        <div className="likes-info">
          {eventType === 'like_doc' ? (
            user && <span>来自：{user.name}</span>
          ) : (
            <span>{watchesCount} 人关注</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookWatched;
