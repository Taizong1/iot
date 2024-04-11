import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const Index = () => {  
  return (  
    <div>  
      <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{  
            background: 'white', // Set the background color to white  
            minHeight: 280,  
            padding: 24,  
            border: '1px solid #e8e8e8', // Add a 1px solid border with the specified color  
          }}  
        >
          Content
        </div>
    </div>  
  );  
}  
  
export default Index;  