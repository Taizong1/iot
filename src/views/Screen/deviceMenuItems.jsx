import { WifiOutlined,UserOutlined,SkinOutlined,HomeOutlined, CloudOutlined,LaptopOutlined,RocketOutlined,NotificationOutlined } from '@ant-design/icons';  
import React from 'react';  
  
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
  
const deviceMenuItems = Object.keys(typeMapping).map((key, index) => {  
  const subKey = `sub${index + 1}`;  
  const icon = [WifiOutlined,SkinOutlined,HomeOutlined,UserOutlined, RocketOutlined, CloudOutlined,WifiOutlined,NotificationOutlined][index]; // 循环使用三种图标  
  return {  
    key: subKey,  
    icon: React.createElement(icon),  
    label: typeMapping[key],  

    // children: new Array(4).fill(null).map((_, j) => {  
    //   const optionKey = index * 4 + j + 1;  
    //   return {  
    //     key: optionKey,  
    //     label: `option${optionKey}`,  
    //   };  
    // }),  

  };  
});  
  
export default deviceMenuItems;  