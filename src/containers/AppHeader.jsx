import React from "react";  
import PropTypes from "prop-types";  
import { Menu, Dropdown, Layout, Avatar } from "antd";  
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'; // 修改了 Icon 的引入  
import avatar from "../assets/images/user.png";  
const { Header } = Layout;  
  
const AppHeader = props => {  
  let { menuClick,  menuToggle, loginOut, username } = props;  
  const menu = (  
    <Menu>  
      <Menu.ItemGroup title="用户设置">  
          
      </Menu.ItemGroup>  
      <Menu.Divider />  
      <Menu.Item>  
        <span onClick={loginOut}>  
          <LogoutOutlined /> 退出登录 {/* 使用新的 LogoutOutlined 图标 */}  
        </span>  
      </Menu.Item>  
    </Menu>  
  );  
  
  return (  
    <Header className="header">  
      <div className="left">  
        {menuToggle ? <MenuUnfoldOutlined style={{ fontSize: "2rem" }} onClick={menuClick} /> : <MenuFoldOutlined style={{ fontSize: "2rem" }} onClick={menuClick} /> } {/* 使用新的 MenuUnfoldOutlined 和 MenuFoldOutlined 图标 */}  
      </div>  
      <div className="right">  
  
        <span style={{ marginRight: '15px' }}>用户名：{username}</span>  
  
        <div>  
          <Dropdown overlay={menu} overlayStyle={{ width: "20rem" }}>  
            <div className="ant-dropdown-link">  
              <Avatar  
                icon={<UserOutlined />} // 使用新的 UserOutlined 图标  
                src={avatar}  
                alt="avatar"  
                style={{ cursor: "pointer", width: "70px", height: "70px" }}  
              />  
            </div>  
          </Dropdown>  
        </div>  
      </div>  
    </Header>  
  );  
};  
  
AppHeader.propTypes = {  
  menuClick: PropTypes.func,  
  avatar: PropTypes.string,  
  menuToggle: PropTypes.bool,  
  loginOut: PropTypes.func  
};  
  
export default AppHeader;  