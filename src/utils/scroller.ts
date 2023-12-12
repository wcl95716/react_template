import { scroller } from 'react-scroll';

export const scrollToBottom = (scrollId: string, containerId: string) => {
  scroller.scrollTo(scrollId, {
    duration: 800,
    delay: 0,
    smooth: true,
    containerId,
    offset: 50,
  });
};
