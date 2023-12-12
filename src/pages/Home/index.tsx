import React, { Fragment, useState } from 'react';
import { Tabs, Card } from 'antd';

import MooseContainer from '@/components/Common/MooseContainer';
import MooseLayout from '@/components/Common/MooseLayout';
import RecommendCarousel from '@/components/Recommend/RecommendCarousel';
import RecommendList from '@/components/Recommend/RecommendList';
import RecommendFollowCard from '@/components/Recommend/RecommendFollowCard';

import QuestionList from '@/components/Question/QuestionList';
import HotQuestionCard from '@/components/Question/HotQuestionCard';
import HotTagCard from '@/components/Tag/HotTagCard';

import './index.less';

const HomePage: React.FC = (props) => {
  console.log('HomePage :: ', props);
  const [recommendType, setRecommendType] = useState('recommend');

  const items = [
    {
      key: 'follow',
      label: '关注',
      children: (
        <Card>
          <RecommendList />
        </Card>
      ),
    },

    {
      key: 'recommend',
      label: '推荐',
      children: (
        <Fragment>
          <RecommendCarousel />
          <Card>
            <RecommendList />
          </Card>
        </Fragment>
      ),
    },

    {
      key: 'question',
      label: '问答',
      children: (
        <Card>
          <QuestionList />
        </Card>
      ),
    },
  ];

  return (
    <MooseContainer containerClassName="recommend-container">
      <MooseLayout
        leftContent={
          <Tabs
            defaultActiveKey={recommendType}
            animated={false}
            onChange={(activeKey) => setRecommendType(activeKey)}
            items={items}
          />
        }
        rightContent={
          <div style={{ marginTop: 64 }}>
            {recommendType === 'follow' || recommendType === 'recommend' ? (
              <RecommendFollowCard recommendType={recommendType} />
            ) : (
              <Fragment>
                <HotTagCard />
                <div className="mt24">
                  <HotQuestionCard />
                </div>
              </Fragment>
            )}
          </div>
        }
        showCalendar={null}
        showLoadMore={null}
      />
    </MooseContainer>
  );
};

export default HomePage;
