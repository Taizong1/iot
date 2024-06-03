import React, {useEffect, useState, useCallback} from "react";
import {
    Layout,
    Form,
    Row,
    Col,

    Icon,
    Divider
} from "antd";
import "./style.css"

import { FullscreenOutlined } from '@ant-design/icons';  
import Line from "./chart/line.jsx";
import Bar from "./chart/bar.jsx"
import Scatter from "./chart/scatter.jsx"
const DeviceInfo = props => {

 
  return (
    <Layout className="index animated fadeIn">
      <Row gutter={24} className="index-header">
      <Col span={24}>
      <div className="base-style">
      <div className="bigFont">当前类别设备的总数: 20</div>  
      </div>
      </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <div className="base-style">
            <div className="bar-header">
            <div className="headFont">设备上线状况</div>
              
            </div>
            <Divider />
            <Line />
          </div> 
        </Col>
        <Col span={12}>  
          <div className="base-style">
            <div className="bar-header">
            <div className="headFont">MQTT数据总流量柱状图</div>
            </div>
            <Divider />
            <Bar />
          </div>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={24}>
          <div className="base-style">
            <div className="bar-header">
            <div className="headFont">设备坐标散点图</div>
                
              </div>
              <Divider />
          
          <Scatter/>
          </div>
        </Col>

      </Row>
    </Layout>
  );
}

export default DeviceInfo;  
