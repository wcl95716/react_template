import React, { Fragment, useState } from 'react';

import { Card, Divider } from 'antd';
import { WaterMark } from '@ant-design/pro-layout';

import { Viewer } from '@bytemd/react';

import MooseContainer from '@/components/Common/MooseContainer';
import MooseLayout from '@/components/Common/MooseLayout';

import CorrelationArticleCard from '@/components/Article/CorrelationArticleCard';

import CatalogueAnchorCard from '@/components/Article/CatalogueAnchorCard';

import AboutAuthorCard from '@/components/Profile/AboutAuthorCard';

import CommentList from '@/components/Comment/CommentList';

import RecommendList from '@/components/Recommend/RecommendList';

import { plugins } from '../../../plugins';

import 'bytemd/dist/index.min.css';

import 'highlight.js/styles/github.css';

import './index.css';

import '../theme.css';

import data from '../../../mock/example.json';

const ArticleDetailPage: React.FC = (props) => {
  console.log('ArticleDetail :: ', props);
  const [articleContent] = useState(data.articleContent);

  const handleViewerSanitize = (schema: any) => {
    return {
      ...schema,
      clobberPrefix: '',
    };
  };

  return (
    <MooseContainer containerClassName="detail-container">
      <MooseLayout
        leftContent={
          <Fragment>
            <Card>
              <div className="detail-title">
                <h2>{data.articleTitle}</h2>
              </div>
              <WaterMark
                rotate={-22}
                fontSize={16}
                zIndex={9}
                content="全栈技术部"
                fontColor="rgba(0,0,0,.15)"
              >
                <Viewer plugins={plugins} value={articleContent} sanitize={handleViewerSanitize} />
              </WaterMark>
            </Card>

            <Divider />

            <Card size="small" className="comment-list-card">
              <CommentList />
            </Card>

            <Divider />

            <Card size="small" title="相关推荐">
              <RecommendList />
            </Card>
          </Fragment>
        }
        rightContent={
          <Fragment>
            <AboutAuthorCard />

            <div className="mt24">
              <CorrelationArticleCard />
            </div>

            <div className="mt24">
              <CatalogueAnchorCard />
            </div>
          </Fragment>
        }
        showCalendar={null}
        showLoadMore={null}
      />
    </MooseContainer>
  );
};

export default ArticleDetailPage;
