import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Col, Table, Row, Statistic, Icon, message} from "antd";

import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';
import { WarningOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import {Polyline} from 'react-bmapgl'

const server = "http://10.214.241.121:8081";

const BMapGL = window.BMapGL
const DeviceData = props => {
    // 初始化地图
    var map;
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

    // 初始化时候请求一次数据
    useEffect(() => {
        const record = props.record;
        if (record.length !== 0) {
            pageChange(page, pageSize, record);
        }
        // eslint-disable-next-line
        let recordData = []
        let change = (time) => {
            return time.getFullYear() + "-" + (time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
        }
        record.forEach(item => {
            recordData.push({
                id: item.message_id,
                info: item.info,
                alert: item.alert == 1 ? true : false,
                lat: item.latitude,
                lng: item.longitude,
                value: item.value,
                timestamp: change(new Date(item.timestamp))
            })
        })

        recordData.sort((m1, m2) => {
            return new Date(m2.timestamp).getTime() - new Date(m1.timestamp).getTime();
        })
        const BMapGL = window.BMapGL
        const pois = recordData.map(item => ({ lng: item.lng, lat: item.lat })).slice(0, Math.min(5, recordData.length));
        const map = new BMapGL.Map("container");
        //可修改初始缩放等级
        map.centerAndZoom(pois[0], 10);
        map.enableScrollWheelZoom(true); //鼠标缩放
        var zoomCtrl = new BMapGL.ZoomControl();  // (地图右下角+ - 缩放按钮) 添加缩放控件
        map.addControl(zoomCtrl);

        const polyline = new BMapGL.Polyline(pois, {
            enableEditing: false,
            enableClicking: true,
            strokeWeight: 6,
            strokeOpacity: 0.8,
            strokeColor: "red",
          });
          map.addOverlay(polyline);

        console.log(recordData)
        setData(recordData)
        setTotal(recordData.length)

    }, [props.record]);

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
        },
        // eslint-disable-next-line
        []
    );

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
