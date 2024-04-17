import React, { useState, useEffect, useReducer } from "react";
import {Routes, Route, Navigate,useNavigate, Outlet} from "react-router-dom";
import { Layout, BackTop, message } from "antd";
import routes from "../routes/index.js";

import menus from "./menu";

import "../style/layout.css"
import AppHeader from "./AppHeader.jsx";
import AppAside from "./AppAside.jsx";
import AppFooter from "./AppFooter.jsx";

const { Content } = Layout;

const MENU_TOGGLE = "menuToggle";



const reducer = (state, action) => {
  switch (action.type) {
    case MENU_TOGGLE:
      return { ...state, menuToggle: !state.menuToggle };
    default:
      return state;
  }
};

const getMenu = menu => {
  let newMenu,
    auth = JSON.parse(localStorage.getItem("user")).auth;
  if (!auth) {
    return menu;
  } else {
    newMenu = menu.filter(res => res.auth && res.auth.indexOf(auth) !== -1);
    return newMenu;
  }
};

const DefaultLayout = (props) => {
  const navigate = useNavigate(); 
  
  // 权限校验，如果没有登陆，跳回登陆界面
  // 如果登陆了，获取Menu信息并展示
  const [menu] = useState(prevState => {
    //if (!localStorage.getItem("user")) {
    //便于测试，暂时注释掉
    if (false){
      navigate("/login");
      return [];
    } else {
      return getMenu(menus);
    }
  });

  const [state, dispatch] = useReducer(reducer, { menuToggle: false });


  const menuClick = () => {
    dispatch({ type: "menuToggle" });
  };

  const loginOut = () => {
    localStorage.clear();
    navigate("/login");
    message.success("登出成功!");
  };

  useEffect(() => {
    // let { pathname } = props.location;
    let timer;

    return () => {
      timer && clearTimeout(timer);
    };
  });

  return (
    <Layout className="app">
      <BackTop />
      <AppAside menuToggle={state.menuToggle} menu={menu} />
      <Layout
        style={{
          marginLeft: state.menuToggle ? "80px" : "200px",
          minHeight: "100vh"
        }}
      >
        <AppHeader
          menuToggle={state.menuToggle}
          menuClick={menuClick}
          loginOut={loginOut}
          username={JSON.parse(localStorage.getItem("user")).name}
        />
        <Content className="content">  
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
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;  
