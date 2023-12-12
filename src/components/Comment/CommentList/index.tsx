import React, { createElement, useState } from 'react';

import { Comment, Tooltip, Avatar } from 'antd';

import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

import moment from 'moment';

const CommentList = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string>('');

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="喜欢">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="不喜欢">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">回复</span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={<a>江景</a>}
        avatar={
          <Avatar src="https://moose-plus.oss-cn-shenzhen.aliyuncs.com/avatar/avatar%20%281%29.jpeg" />
        }
        content={<p>非常认同！！</p>}
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
      <Comment
        actions={actions}
        author={<a>江景</a>}
        avatar={
          <Avatar src="https://moose-plus.oss-cn-shenzhen.aliyuncs.com/avatar/avatar%20%281%29.jpeg" />
        }
        content={<p>非常认同！！</p>}
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
      <Comment
        actions={actions}
        author={<a>江景</a>}
        avatar={
          <Avatar src="https://moose-plus.oss-cn-shenzhen.aliyuncs.com/avatar/avatar%20%281%29.jpeg" />
        }
        content={<p>非常认同！！</p>}
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
};

export default CommentList;
