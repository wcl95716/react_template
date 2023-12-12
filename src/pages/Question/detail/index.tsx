import React, { Fragment } from 'react';

import MooseContainer from '@/components/Common/MooseContainer';
import MooseLayout from '@/components/Common/MooseLayout';

import HotTagCard from '@/components/Tag/HotTagCard';

import HotQuestionCard from '@/components/Question/HotQuestionCard';

import 'bytemd/dist/index.min.css';

import 'highlight.js/styles/github.css';

import './index.less';

const QuestionDetailPage: React.FC = (props) => {
  console.log('QuestionDetailPage :: ', props);
  const { match } = props;
  return (
    <Fragment>
      <MooseContainer containerClassName="question-detail-container">
        <MooseLayout
          leftContent={
            <Fragment>
              <div className="markdown-body">
                <code>
                  <pre>{JSON.stringify(match, null, 4)}</pre>
                </code>
              </div>
            </Fragment>
          }
          rightContent={
            <Fragment>
              <HotTagCard />

              <div className="mt24">
                <HotQuestionCard />
              </div>
            </Fragment>
          }
        />
      </MooseContainer>
    </Fragment>
  );
};

export default QuestionDetailPage;
