import { Link } from 'umi';

import { Card, Button } from 'antd';

import { DETAULT_AVATAR } from '@/mock/avatar';

import './index.css';

const AboutAuthorCard = () => {
  return (
    <Card size="small" className="about-author-card">
      <div className="author-avatar">
        <img src={DETAULT_AVATAR} />
      </div>
      <div className="user-name-info">
        <Link to="/u/1">
          <span className="name">江景</span>
        </Link>
        <div className="desc">但行好事，莫问前程</div>
      </div>

      <div className="follow-info">
        <a href="">
          <p className="user-count">8391</p>
          <p className="user-label">关注者</p>
        </a>
        <a href="">
          <p className="user-count">1</p>
          <p className="user-label">关注了</p>
        </a>
      </div>
      <div className="operation-btns">
        <Button type="primary">关注</Button>
        <Button>私信</Button>
      </div>
    </Card>
  );
};

export default AboutAuthorCard;
