import React, { useState } from 'react';

import { Link } from 'umi';
import { Avatar, Button, message } from 'antd';

import { Editor } from '@bytemd/react';

import PublishArticleDrawer from '@/components/Article/PublishArticleDrawer';

import { isEmpty } from 'lodash';

import { plugins } from '../../../plugins';

import zhHans from 'bytemd/locales/zh_Hans.json';

import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/github.css';

import './index.css';

import '../theme.css';

import { DETAULT_AVATAR } from '@/mock/avatar';

import data from '@/mock/example.json';

const ArticleCreatePage: React.FC<any> = () => {
  const [artitleContent, setArtitleContent] = useState(data.artitleContent);
  const [artitleTitle, setArticleTitle] = useState(data.artitleTitle);

  const [showPublishDrawer, setShowPublishDrawer] = useState(true);

  const handleTitleInputChange = (e) => {
    setArticleTitle(e.target.value);
  };

  const handlePublishArticle = () => {
    if (isEmpty(artitleTitle)) {
      message.error('请输入文章标题');
      return;
    }
    if (isEmpty(artitleContent)) {
      message.error('请输入内容');
    }
    setShowPublishDrawer(true);
  };

  const handleClosePublishDrawer = () => {
    setShowPublishDrawer(false);
  };

  const handlePublish = (artitleInfo) => {
    console.log({ artitleTitle, artitleContent, ...artitleInfo });
  };

  return (
    <div className="create-container">
      <header className="header create-header">
        <input
          placeholder="输入文章标题..."
          spellCheck="false"
          maxLength={60}
          className="title-input"
          value={artitleTitle}
          onChange={handleTitleInputChange}
        />
        <div className="right-box">
          <div className="with-padding">
            <Button
              type="primary"
              size="small"
              disabled={isEmpty(artitleTitle) || isEmpty(artitleContent)}
              onClick={handlePublishArticle}
            >
              发布
            </Button>
          </div>
          <Link to={`/u/1`}>
            <Avatar src={DETAULT_AVATAR} />
          </Link>
        </div>
      </header>
      <Editor
        value={artitleContent}
        locale={zhHans}
        plugins={plugins}
        placeholder="请输入内容..."
        onChange={(v) => {
          setArtitleContent(v);
        }}
        // uploadImages={(files) => {
        //   if (files.length === 0) return [];
        //   return [{ ...files, url: 'url' }];
        // }}
      />

      <PublishArticleDrawer
        open={showPublishDrawer}
        onCloseDrawer={handleClosePublishDrawer}
        onSubmit={handlePublish}
      />
    </div>
  );
};

export default ArticleCreatePage;
