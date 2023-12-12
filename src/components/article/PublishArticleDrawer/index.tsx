import { Drawer } from 'antd';
import PublishArtitleForm from './PublishArtitleForm';

const PublishArticleDrawer = ({ open, onCloseDrawer, onSubmit }) => {
  return (
    <Drawer title="文章发布" width={640} open={open} onClose={onCloseDrawer}>
      <PublishArtitleForm onSubmit={onSubmit} />
    </Drawer>
  );
};

export default PublishArticleDrawer;
