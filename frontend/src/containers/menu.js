import { HomeOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const menu = [
  {
    label: '首页',
    key: 'Index',
    icon: <HomeOutlined />,
    
  },
  {
    label: '设备中心',
    key: 'Device',
    icon: <MailOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: '数据大屏',
    key: 'screen',
    icon: <HomeOutlined />,
    
  },
  {
    label: '用户中心',
    key: 'User',
    icon: <SettingOutlined />,
    
  },
];
export default menu;
