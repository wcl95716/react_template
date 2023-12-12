import React from 'react';
import { Row, Col, Button } from 'antd';

import CalendarCard from '../CalendarCard';
import FollowWxCard from '../FollowWxCard';

import './index.less';

type MooseLayoutProps = {
  showCalendar: boolean | null;
  showLoadMore: boolean | null;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

const MooseLayout: React.FC<MooseLayoutProps> = ({
  showCalendar,
  showLoadMore,
  leftContent,
  rightContent,
}) => {
  return (
    <Row className="moose-layout" gutter={[24, 24]}>
      <Col className="left-content" xs={24} sm={24} md={17} span={12}>
        {leftContent}

        {showLoadMore && (
          <div className="mt24">
            <Button block>加载更多</Button>
          </div>
        )}

        <div className="bottom-container">
          <div>TODO: 底部文案</div>
        </div>
      </Col>

      <Col className="right-content" xs={24} sm={24} md={7} span={12}>
        {rightContent}

        {showCalendar && (
          <div className="mt24">
            <CalendarCard />
          </div>
        )}

        <div className="mt24">
          <FollowWxCard />
        </div>
      </Col>
    </Row>
  );
};
export default MooseLayout;
