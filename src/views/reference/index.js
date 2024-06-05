import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Reference from './reference';
const Index = () => {  
  return (  
    <div>  
      <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>用户中心</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{  
            background: 'white', // Set the background color to white  
            minHeight: 280,  
            padding: 24,  
            border: '1px solid #e8e8e8', // Add a 1px solid border with the specified color  
          }}  
        >
          <Reference/>
        </div>
    </div>  
  );  
}  
  
export default Index;  