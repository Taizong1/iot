import React from 'react';
import { Breadcrumb, Layout, Menu, theme ,Avatar , message} from 'antd';
import menus from "./menu";
import "./style.css"
import {Routes, Route, Navigate,useNavigate, Outlet} from "react-router-dom";
import { UserOutlined,LogoutOutlined } from '@ant-design/icons';
import routes from "../routes/index.js";
import { Link } from 'react-router-dom'; 
const { Header, Content, Footer } = Layout;



const DefaultLayout = () => {
  
  const navigate = useNavigate(); 
  
  const loginOut = () => {
    localStorage.clear();
    navigate("/login");
    message.success("登出成功!");
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="demo-logo" />
        <Menu  
          theme="dark"  
          mode="horizontal"  
          defaultSelectedKeys={['home']}  
          style={{ minWidth: 0 }}  
        >  
          {menus.map(item => (  
            <Menu.Item key={item.key}>  
              <Link to={item.path}>{item.label}</Link>  
            </Menu.Item>  
          ))}  
          <Menu.Divider />  
          <Menu.Item>  
            <span onClick={loginOut}>  
              <LogoutOutlined /> 退出登录 {/* 使用新的 LogoutOutlined 图标 */}  
            </span>  
          </Menu.Item>  
        </Menu>  
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>      
            <span style={{ color: 'white', marginRight: '10px' }}>Username</span> 
            <Avatar size={60} icon={<UserOutlined />} />
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
        IOT ©{new Date().getFullYear()}  by 大规模信息系统开发试验课程
      </Footer>
    </Layout>
  );
};
export default DefaultLayout;