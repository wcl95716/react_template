import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return <DefaultFooter copyright={`${currentYear} 全站技术部`} links={[]} />;
};

export default Footer;
