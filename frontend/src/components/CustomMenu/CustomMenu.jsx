import React, { useState, useEffect } from "react";  
import PropTypes from "prop-types";  
import { Menu } from "antd";  
import { Link, useLocation } from "react-router-dom";  
  
const getOpenKeys = string => {  
  let newStr = "",  
    newArr = [],  
    arr = string.split("/").map(i => "/" + i);  
  for (let i = 1; i < arr.length - 1; i++) {  
    newStr += arr[i];  
    newArr.push(newStr);  
  }  
  return newArr;  
};  
  
const CustomMenu = props => {  
  const location = useLocation();  
  const [state, setState] = useState({  
    openKeys: [],  
    selectedKeys: []  
  });  
  
  let { openKeys, selectedKeys } = state;  
  
  useEffect(() => {  
    let { pathname } = location;  
    setState(prevState => {  
      return {  
        ...prevState,  
        selectedKeys: [pathname],  
        openKeys: getOpenKeys(pathname)  
      };  
    });  
  }, [location]);  
  
  const onOpenChange = openKeys => {  
    setState(prevState => {  
      if (openKeys.length === 0 || openKeys.length === 1) {  
        return { ...prevState, openKeys };  
      }  
      const latestOpenKey = openKeys[openKeys.length - 1];  
  
      if (latestOpenKey.includes(openKeys[0])) {  
        return { ...prevState, openKeys };  
      } else {  
        return { ...prevState, openKeys: [latestOpenKey] };  
      }  
    });  
  };  
  
  const renderMenuItem = ({ key, icon, title }) => (  
    <Menu.Item key={key}>  
      <Link to={key}>  
        {icon}  
        <span>{title}</span>  
      </Link>  
    </Menu.Item>  
  );  
  
  const renderSubMenu = ({ key, icon, title, subs }) => {  
    return (  
      <Menu.SubMenu  
        key={key}  
        title={  
          <span>  
            {icon}  
            <span>{title}</span>  
          </span>  
        }  
      >  
        {subs &&  
          subs.map(item => {  
            return item.subs && item.subs.length > 0  
              ? renderSubMenu(item)  
              : renderMenuItem(item);  
          })}  
      </Menu.SubMenu>  
    );  
  };  
  
  return (  
    <Menu  
      mode="inline"  
      theme="light"  
      openKeys={openKeys}  
      selectedKeys={selectedKeys}  
      onClick={({ key }) =>  
        setState(prevState => ({ ...prevState, selectedKeys: [key] }))  
      }  
      onOpenChange={onOpenChange}  
    >  
      {props.menu &&  
        props.menu.map(item => {  
          return item.subs && item.subs.length > 0  
            ? renderSubMenu(item)  
            : renderMenuItem(item);  
        })}  
    </Menu>  
  );  
};  
  
CustomMenu.propTypes = {  
  menu: PropTypes.array.isRequired  
};  
  
export default CustomMenu; 