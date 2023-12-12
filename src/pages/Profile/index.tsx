import React, { Fragment } from 'react';

import { Tabs, Card } from 'antd';

import MooseContainer from '@/components/Common/MooseContainer';
import MooseLayout from '@/components/Common/MooseLayout';

import AboutAuthorCard from '@/components/Profile/AboutAuthorCard';
import DynamicList from '@/components/Profile/DynamicList';
import KnowledgeList from '@/components/Profile/KnowledgeList';
import AnswerList from '@/components/Profile/AnswerList';
import AskList from '@/components/Profile/AskList';
import PinList from '@/components/Profile/PinList';

import './index.less';

const ProfilePage: React.FC = (props) => {
  console.log('ProfilePage :: ', props);

  const items = [
    { key: 'dynamic', label: '动态', children: <DynamicList /> },
    { key: 'knowledge', label: '知识库', children: <KnowledgeList /> },
    { key: 'answers', label: '回答（92）', children: <AnswerList /> },
    { key: 'asks', label: '提问（201）', children: <AskList /> },
    { key: 'pins', label: '想法（2）', children: <PinList /> },
  ];

  return (
    <MooseContainer containerClassName="profile-container">
      <MooseLayout
        showLoadMore
        leftContent={
          <Fragment>
            <Card size="small">
              <Tabs defaultActiveKey="dynamic" animated={false} items={items}></Tabs>
            </Card>
          </Fragment>
        }
        rightContent={
          <Fragment>
            <AboutAuthorCard />
          </Fragment>
        }
      />
    </MooseContainer>
  );
};

export default ProfilePage;
