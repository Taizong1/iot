import React, {useEffect, useState, useCallback} from "react";
import {
    Layout,
    Row,
    Col,
    Divider
} from "antd";
import "./style.css"

import { FullscreenOutlined } from '@ant-design/icons';  
import Line from "./chart/line.jsx";
import Bar from "./chart/bar.jsx"
import Scatter from "./chart/scatter.jsx"


const deviceServer = "http://10.214.241.121:8081";
const messageServer = "http://10.214.241.121:8082";

const DeviceInfo = props => {
  
  const deviceType = props;
  const [deviceData, setDeviceData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [messageDataCount, setMessageDataCount] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [totalDeviceCountNow, setTotalDeviceCountNow] = useState(0);
  const [totalDevice, setTotalDevice] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [onlineTotalDevice, setOnlineTotalDevice] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [notOnlintotalDevice, setNotOnlineTotalDevice] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [timeLabel, setTimeLabel] = useState(["", "", "", "", "", "", ""]);
  
  useEffect(() => {
    let day = new Date();
    let oneDay = 24 * 60 * 60 * 1000;
    let dayList = [];
    for(let i = 0; i < 7; i++){
      dayList.push(day.getMonth() + "月" + day.getDate() + "日");
      day.setTime(day.getTime() - oneDay);
    }
    setTimeLabel(dayList.reverse());
  }, [new Date().getDay()])

  useEffect(() => {
    axios.post(deviceServer + "/api/device_api/getTypeDevice", {device_type: deviceType}).then(res => {
      let messageGetData = [];
      let messageCount = [0, 0, 0, 0, 0, 0, 0];
      let totalCount = [0, 0, 0, 0, 0, 0, 0];
      let onlineCount = [0, 0, 0, 0, 0, 0, 0];
      let notOnlineCount = [0, 0, 0, 0, 0, 0, 0];

      res.data.forEach(item => {
        if(item.online == 1)onlineCount++;
        axios.post(messageServer + "/api/iotmessage_api/getMessage", {device_id: item.device_id}).then(message => {
          message=message.data;
          messageGetData.push(message);
          message.sort((m1, m2)=>{
            return m1.timestamp.getTime() - m2.timestamp.getTime();
          })
          let today = new Date().getTime;
          let sevenDay = new Date().getTime - 7 * 24 * 60 * 60 * 1000;
          message = message.filter(item => item.timestamp.getTime() > sevenDay);
          let Judge = new Array(7).fill(false);
          message.forEach(item => {
            let dif = Math.floor((today - item.timestamp.getTime()) / 1000 / 60 / 60 / 24);
            messageCount[6 - dif]++;
            if(!Judge[dif]){
              Judge[dif] = true;
              totalCount[6 - dif]++;
              if(item.online == 1){
                onlineCount[6 - dif]++;
              }else{
                notOnlineCount[6 - dif]++;
              }
            }
          })
        })
      })
      setDeviceData(res.data);
      setMessageData(messageGetData);
      setMessageDataCount(messageCount);
      setTotalDevice(totalCount);
      setOnlineTotalDevice(onlineCount);
      setNotOnlineTotalDevice(notOnlineCount);
      setTotalDeviceCountNow(res.data.length);
    })
  }, deviceType)

  return (
    <Layout className="index animated fadeIn">
      <Row gutter={24} className="index-header">
      <Col span={24}>
      <div className="base-style">
      <div className="bigFont">当前类别设备的总数: {totalDeviceCountNow}</div>  
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
