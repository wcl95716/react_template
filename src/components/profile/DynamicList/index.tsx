import React from 'react';

import DynamicItem from '@/components/Profile/DynamicList/DynamicItem';

import dynamic from '@/mock/dynamic.json';

const DynamicList: React.FC<any> = (props) => {
  console.log('DynamicList :: ', props);
  return (
    <div>
      {dynamic.map((item: any) => {
        return <DynamicItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default DynamicList;
