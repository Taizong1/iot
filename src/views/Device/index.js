import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import deviceMenuItems from './deviceMenuItems';
import DeviceInfo from './Device'
const { Header, Content, Footer, Sider } = Layout;


const Device = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>设备中心</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={deviceMenuItems}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 400,
            }}
          >
            <DeviceInfo />
          </Content>
        </Layout>
      </Content>

    </Layout>
  );
};
export default Device;