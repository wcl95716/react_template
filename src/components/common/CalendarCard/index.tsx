import React from 'react';
import { Card, Calendar } from 'antd';

const CalendarCard = () => {
  return (
    <Card size="small">
      <Calendar fullscreen={false} />
    </Card>
  );
};

export default CalendarCard;
