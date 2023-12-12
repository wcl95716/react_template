import React, { Fragment } from 'react';

import RecommendCarousel from '../RecommendCarousel';
import RecommendList from '../RecommendList';

import './index.css';

const RecommendCard = () => {
  return (
    <Fragment>
      <RecommendCarousel />
      <RecommendList />
    </Fragment>
  );
};
export default RecommendCard;
