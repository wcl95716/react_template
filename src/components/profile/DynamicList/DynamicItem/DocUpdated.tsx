import React from 'react';

import { DEFAULT_COVER } from '@/mock/avatar';

import './DocUpdated.less';

const DocUpdated: React.FC<any> = ({ name, description, cover, book }) => {
  return (
    <div className="doc-updated">
      <div className="top">
        <div className="wrap">
          <div className="detail">
            <p className="title">{name}</p>
            {description && <div className="description">{description}</div>}
          </div>
          {cover && (
            <div className="cover">
              <img src={DEFAULT_COVER} />
            </div>
          )}
        </div>
      </div>

      <div className="bottom">{book && <p className="extra">发布在 {book}</p>}</div>
    </div>
  );
};

export default DocUpdated;
