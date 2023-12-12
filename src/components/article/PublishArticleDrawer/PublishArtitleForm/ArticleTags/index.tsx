import React from 'react';
import { Tag } from 'antd';

import tags from '@/mock/tag.json';

const { CheckableTag } = Tag;

const ArticleTags: React.FC<any> = ({ value, onChange }) => {
  console.log('ArticleTags value :: ', value);

  const handleCheckableTagChange = (tag: any) => {
    onChange(tag.tag_id);
  };

  return (
    <div>
      {tags.map((tag) => {
        return (
          <CheckableTag
            key={tag.tag_id}
            checked={value === tag.tag_id}
            onChange={() => {
              handleCheckableTagChange(tag);
            }}
          >
            {tag.tag_name}
          </CheckableTag>
        );
      })}
    </div>
  );
};

export default ArticleTags;
