import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import deviceMenuItems from './deviceMenuItems';
import DeviceInfo from './Device'
const { Content, Sider } = Layout;

const typeMapping = {  
  0: "智能物联网设备",  
  1: "智能穿戴设备",  
  2: "智能家居设备",  
  3: "智能物流设备",  
  4: "智能飞行器设备",  
  5: "智能互联网设备",  
  6: "智能无线设备",  
  7: "其他",
};  

const Device = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let [deviceType, setDeviceType] = useState("智能物联网设备");

  let deviceTypeUpdate = (item) =>{
    setDeviceType(typeMapping[item.key.substr(3)-1])
  }

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
          <Breadcrumb.Item>数据大屏</Breadcrumb.Item>
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
              onSelect={deviceTypeUpdate}
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
            <DeviceInfo {...{deviceType}}/>
          </Content>
        </Layout>
      </Content>

    </Layout>
  );
};
export default Device;