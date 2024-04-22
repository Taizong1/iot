import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Col, Table, Row, Statistic, Icon, message} from "antd";


import { WarningOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'; 
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

    // loading状态
    let [load, setLoad] = useState(false);

    // 初始化时候请求一次数据
    useEffect(() => {
        

        const record = props.record;

        if (record.length !== 0) {
            pageChange(page, pageSize, record);
        }
        // eslint-disable-next-line
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

            fetchData();
        },
        // eslint-disable-next-line
        []
    );

    // 获取数据
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

    return (
        

        <div>
            <Row gutter={16}>  

            <Col span={12}>
                <div className="base-style">
                    <div style={{height: "600px"}} id="detailMap"></div>
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
