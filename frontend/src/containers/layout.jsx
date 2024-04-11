import React from 'react';
import { Breadcrumb, Layout, Menu, theme ,Avatar } from 'antd';
import menus from "./menu";
import "./style.css"
import {Routes, Route, Navigate,useNavigate, Outlet} from "react-router-dom";

import routes from "../routes/index.js";
const { Header, Content, Footer } = Layout;



const DefaultLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={menus}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>  
            <Avatar src="../assets/images/user.png" /> {/* Replace with the actual path to the user's avatar */}  
            <span style={{ marginLeft: '10px' }}>Username</span> {/* Replace "Username" with the actual username */}  
        </div> 
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Routes>  
          {routes.map(item => (  
            <Route  
              key={item.path}  
              path={item.path}  
              element={  
                <item.component />  
              }  
            />  
          ))}  
            <Route path="*" element={<Navigate to="/404" />} />  
          </Routes>  
        </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default DefaultLayout;