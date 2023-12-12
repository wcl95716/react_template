import React from 'react';
import { Carousel } from 'antd';

import selection from '@/mock/selection';

import './index.css';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
};

const RecommendCarousel: React.FC = () => {
  const onChange = (a, b, c) => {
    console.log(a, b, c);
  };

  return (
    <Carousel className="recommend-carousel" afterChange={onChange}>
      {selection.map((item) => {
        return (
          <div key={item.article_id}>
            <div
              className="recommend-carousel-item"
              style={{
                ...contentStyle,
                backgroundImage: `url(${item.cover_image})`,
              }}
            ></div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default RecommendCarousel;
