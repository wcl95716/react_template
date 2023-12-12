import React, { useEffect } from 'react';
import { Card, Anchor } from 'antd';

import './index.css';

const CatalogueAnchorCard = () => {
  // const getChildren = (parent) => {
  //   // 如果当前节点是元素节点，输出当前元素
  //   // eslint-disable-next-line no-unused-expressions
  //   // parent.nodeType === 1 && console.log(parent);
  //   // console.dir(parent);

  //   if (parent.localName === 'a') {
  //     // console.dir(parent);
  //     // console.log(parent.hash);
  //   }

  //   // 获得父节点的所有直接子节点
  //   const children = parent.childNodes;
  //   // 遍历 children 中每个节点
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0, len = children.length; i < len; i++) {
  //     // 对当前子节点递归
  //     getChildren(children[i]);
  //   }
  // };

  useEffect(() => {
    const toc = document.getElementsByClassName('toc');
    const navTocContainer = document.getElementById('nav-toc');
    if (toc[0]) {
      navTocContainer.appendChild(toc[0]);
      // eslint-disable-next-line no-plusplus
      // getChildren(toc[0]);
    }
    return () => {};
  }, []);

  return (
    <Anchor className="catalogue-anchor" offsetTop={56}>
      <Card size="small" className="catalogue-anchor-card">
        <div className="markdown-body catalogue-anchor-card" id="nav-toc">
          <p>目录</p>
        </div>
      </Card>
    </Anchor>
  );
};

export default CatalogueAnchorCard;
