import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Col, Table, Row, Statistic, Icon, message} from "antd";

import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';
import { WarningOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import {Polyline} from 'react-bmapgl'

const server = "http://10.214.241.121:8080";

const BMapGL = window.BMapGL
const DeviceData = props => {
    // 初始化地图
    var map;
    

    
    const initialData = [  
        {  
          id: 1,  
          info: "这是第一条数据的信息",  
          code: "A1",  
          value: 100,  
          alert: false,  
          timestamp: "2024-04-24 12:00:00",  
          lat: 32.1234,  
          lng: 120.5678  
        },  
        {  
          id: 2,  
          info: "这是第二条数据的信息",  
          code: "B2",  
          value: 75,  
          alert: true,  
          timestamp: "2024-04-24 12:05:00",  
          lat: 30.2345,  
          lng: 124.6789  
        },  
        {  
            id: 3,  
            info: "这是第三条数据的信息",  
            code: "C3",  
            value: 60,  
            alert: false,  
            timestamp: "2024-04-24 12:10:00",  
            lat: 30.3456,  
            lng: 114.7890  
          },  
          {  
            id: 4,  
            info: "这是第四条数据的信息",  
            code: "D4",  
            value: 90,  
            alert: true,  
            timestamp: "2024-04-24 12:15:00",  
            lat: 25.4567,  
            lng: 120.8901  
          },  
      ];  
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Value",
            className: "column-money",
            dataIndex: "value",
            key: "value"
        },
        {
            title: "时间",
            dataIndex: "timestamp",
            key: "timestamp"
        }
    ];

    // 展示的数据
    var code = "";
    let [deviceMessage, setDeviceMessage] = useState(null);

    // 设置分页
    let [total, setTotal] = useState(0);
    let [page, setPage] = useState(1);
    let [pageSize, setPageSize] = useState(10);

    // 信息数据
    let [data, setData] = useState([]);

    // loading状态
    let [load, setLoad] = useState(false);

    // 初始化时候请求一次数据
    // useEffect(() => {
        
        // setData(initialData)
    // });

    // 点击下面的分页按钮触发的方法
    const pageChange = useCallback(
        (currentPage, currentSize, currentRecords) => {
            // eslint-disable-next-line
            setPage((page = currentPage === undefined ? page : currentPage));
            // eslint-disable-next-line
            setPageSize(
                // eslint-disable-next-line
                (pageSize = currentSize === undefined ? pageSize : currentSize)
            );

            if (currentRecords !== undefined) {
                // eslint-disable-next-line
                code = currentRecords.length === 0 ? null : currentRecords[0].code;
            }

            fetchData();
        },
        // eslint-disable-next-line
        []
    );

    // 获取数据
    //TODO: 界面初始化加载
    const fetchData = async () => {
        // 开始加载
        setLoad(true);

        let postData = {
            page: page,
            pageSize: pageSize,
            code: code
        };


    }

    const AlertIcon = ({ deviceMessage }) => {  
        if (deviceMessage != null) {  
          if (deviceMessage.alert !== 0) {  
            return <CheckCircleOutlined />;  
          } else {  
            return <WarningOutlined />;  
          }  
        } else {  
          return <LoadingOutlined />;  
        }  
      };  
      
    // useEffect(() => {
    //     const BMapGL = window.BMapGL
    //     const pois = initialData.map(item => ({ lng: item.lng, lat: item.lat }));  
    //     const map = new BMapGL.Map("container");
    //     //可修改初始缩放等级
    //     map.centerAndZoom(pois[0], 7);
    //     map.enableScrollWheelZoom(true); //鼠标缩放
    //     var zoomCtrl = new BMapGL.ZoomControl();  // (地图右下角+ - 缩放按钮) 添加缩放控件
    //     map.addControl(zoomCtrl);

    //     const polyline = new BMapGL.Polyline(pois, {
    //         enableEditing: false,
    //         enableClicking: true,
    //         strokeWeight: 6,
    //         strokeOpacity: 0.8,
    //         strokeColor: "#f5c104",
    //       });
    //       map.addOverlay(polyline);
    // }, [])

    return (
        

        <div>
            <Row gutter={16}>  

            <Col span={12}>
                <div className="base-style">
                    <div id="container" className='Map-container' style={{height: "600px"}}></div>

                </div>
            </Col>
            <Col span={12}>
                <div className="base-style">
                    <Table
                        style={{height: "600px"}}
                        bordered
                        rowKey="id"
                        columns={columns}
                        loading={load}
                        expandedRowRender={record => (
                            <p style={{margin: 0}}>{record.info}</p>
                        )}
                        dataSource={data}
                        scroll={{y: 400}}
                        pagination={{
                            showSizeChanger: true,
                            onChange: pageChange,
                            pageSizeOptions: ["2", "5", "10"],
                            defaultPageSize: pageSize,
                            showTotal: () => {
                                return `共${total}条数据`;
                            },
                            current: page,
                            total: total
                        }}
                        onRow={record => {
                            return {
                                onMouseEnter: event => {
                                    deviceMessage = {
                                        code: record.code,
                                        value: record.value,
                                        alert: record.alert,
                                        info: record.info,
                                        timestamp: record.timestamp,
                                        lat: Math.round(record.lat * 100) / 100,
                                        lng: Math.round(record.lng * 100) / 100
                                    };
                                    setDeviceMessage(deviceMessage);
                                }
                            };
                        }}
                        title={() => {
                            return (
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Statistic
                                            title="目前状态"
                                            value={deviceMessage !== null ? deviceMessage.value : 0}
                                            prefix={
                                                <AlertIcon deviceMessage={deviceMessage} />  
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic
                                            title="目前位置"
                                            value={
                                                "(" +
                                                (deviceMessage !== null ? deviceMessage.lng : 0) +
                                                ", " +
                                                (deviceMessage !== null ? deviceMessage.lat : 0) +
                                                ")"
                                            }
                                        />
                                    </Col>
                                </Row>
                            );
                        }}
                    />
                </div>
            </Col>
            </Row>  
        </div>
        
    );
};


export default DeviceData;
