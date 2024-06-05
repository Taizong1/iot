import React, {useEffect, useState, useCallback} from "react";
import {
    Layout,
    Row,
    Col,
    Divider
} from "antd";
import "./style.css"

import axios from "axios";
import Line from "./chart/line.jsx";
import Bar from "./chart/bar.jsx"
import Scatter from "./chart/scatter.jsx"


const deviceServer = "http://10.214.241.121:8081";
const messageServer = "http://10.214.241.121:8082";

const DeviceInfo = props => {
  
  const {deviceType} = props;
  const [deviceData, setDeviceData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [messageDataCount, setMessageDataCount] = useState(new Array(7).fill(0));
  const [totalDeviceCountNow, setTotalDeviceCountNow] = useState(0);
  const [totalDevice, setTotalDevice] = useState(new Array(7).fill(0));
  const [onlineTotalDevice, setOnlineTotalDevice] = useState(new Array(7).fill(0));
  const [notOnlintotalDevice, setNotOnlineTotalDevice] = useState(new Array(7).fill(0));
  const [timeLabel, setTimeLabel] = useState(["", "", "", "", "", "", ""]);
  
  useEffect(() => {
    let day = new Date();
    let oneDay = 24 * 60 * 60 * 1000;
    let dayList = [];
    for(let i = 0; i < 7; i++){
      dayList.push((day.getMonth()+1) + "月" + day.getDate() + "日");
      day.setTime(day.getTime() - oneDay);
    }
    setTimeLabel(dayList.reverse());
  }, [new Date().getDay()])

  useEffect(() => {
    const postData={
      device_type: deviceType
    }
    axios.post(deviceServer + "/api/device_api/getTypeDevice", postData).then(res => {
      let devices = res.data.devices;
      let messageGetData = [];
      let messageCount = new Array(7).fill(0);
      let totalCount = new Array(7).fill(0);
      let onlineCount = new Array(7).fill(0);
      let notOnlineCount = new Array(7).fill(0);

      let request = devices.map(item => axios.post(messageServer + "/api/iotmessage_api/getMessage", {device_id: item.device_id}))
      Promise.all(request)
        .then(response => {
          for(let i = 0;i < response.length; i++){
            let message = response[i].data.messages;
            message.sort((m1, m2)=>{
              return new Date(m2.timestamp).getTime() - new Date(m1.timestamp).getTime();
            })
            messageGetData.push(message);
            console.log(message)
            let today = new Date().getTime();
            let sevenDay = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
            message = message.filter(item => new Date(item.timestamp).getTime() > sevenDay);
            
            let Judge = new Array(7).fill(-1);
            message.forEach(item => {
              let dif = Math.floor((today - new Date(item.timestamp).getTime()) / 1000 / 60 / 60 / 24);
              console.log(dif)
              messageCount[6 - dif]++;
              if(Judge[dif] == -1){
                Judge[dif] = item.alert;
              }
            })
            for(let i = 0; i < 7; i++){
              if(Judge[i] == -1 && i == 0)continue;
              if(Judge[i] == -1)Judge[i] = Judge[i - 1];
              totalCount[i]++;
              if(Judge[i] == 0)notOnlineCount[i]++;
              if(Judge[i] == 1)onlineCount[i]++;
            }
          }
          setDeviceData(devices);
          setMessageData(messageGetData);
          setMessageDataCount(messageCount);
          setTotalDevice(totalCount);
          setOnlineTotalDevice(onlineCount);
          setNotOnlineTotalDevice(notOnlineCount);
          setTotalDeviceCountNow(devices.length);
        })
    })
  }, [props])

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
            <Line {...{totalDevice, onlineTotalDevice, notOnlintotalDevice, timeLabel}}/>
          </div> 
        </Col>
        <Col span={12}>  
          <div className="base-style">
            <div className="bar-header">
            <div className="headFont">MQTT数据总流量柱状图</div>
            </div>
            <Divider />
            <Bar {...{messageDataCount, timeLabel}}/>
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
          
              <Scatter {...{deviceData, messageData}}/>
          </div>
        </Col>

      </Row>
    </Layout>
  );
}

export default DeviceInfo;  
