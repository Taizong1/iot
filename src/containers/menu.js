import { HomeOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const menus = [
  {
    label: '首页',
    key: 1,
    icon: <HomeOutlined />,
    path:"/index",
  },
  {
    label: '设备中心',
    key: 2,
    icon: <MailOutlined />,
    path:"/device",

  },
  {
    label: '数据大屏',
    key: 'screen',
    icon: <HomeOutlined />,
    
  },
  {
    label: '用户中心',
    key: 3,
    icon: <SettingOutlined />,
    path:"/reference"
  },
];
export default menus;
