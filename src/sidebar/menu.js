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
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
            path:"/device",
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
    key: 3,
    icon: <SettingOutlined />,
    path:"/reference"
  },
];
export default menus;
