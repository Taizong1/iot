import React, {useEffect, useState, useCallback} from "react";
import {
    Layout,
    Form,
    Row,
    Col,
    Table,
    Button,
    message,
    Collapse,
    Select,
    Input,
    Space,
    DatePicker,
    Drawer,
    Descriptions
} from "antd";
import "./style.css"
import {withRouter} from "react-router-dom";
import axios from "axios";

import {UserOutlined, FormOutlined,PlusOutlined} from "@ant-design/icons";
import DeviceData from "./DeviceData";


const server = "http://10.214.241.121:8080";

const {Panel} = Collapse;
const {Option} = Select;
const {TextArea} = Input;

const DeviceInfo = props => {
     
    // 抽屉
    const [open, setOpen] = useState(false);
    let [editRecord, setEditRecord] = useState(null);
    let [tableData, setTableData] = useState([]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    // 搜索条件
    let filter = {
        code: null,
        name: null,
        type: null
    };

    // 设置分页
    let [total, setTotal] = useState(0);
    let [page, setPage] = useState(1);
    let [pageSize, setPageSize] = useState(10);

    // loading状态
    let [load, setLoad] = useState(false);

    // 选择的设备
    let [showRecord, setShowRecord] = useState([]);

    //TODO: 设备删除逻辑
    const handleDelete = deleteid => {
        const confirmed = window.confirm("确定要删除吗？");
        if (confirmed) {
            // 获取修改结果
            let postData = {
                device_id: deleteid
            };
            axios.post(server + `api/device_api/deleteDevice`, postData).then(res => {
                if (res.data.signal === "success") {
                    message.info("删除设备成功");
                    tableData = tableData.filter((item, index )=> index !== deleteid);
                    props.history.go(-1);
                } else {
                    message.error("删除设备失败，" + res.data.message);
                }
            }).catch(err => {
                message.error("删除设备失败");
            });
        }
    }

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
    
    const onlineMapping = {
        0: "离线",
        1: "在线",
    };

    const columns = [
        {title: "编号", dataIndex: "device_id", key: "device_id"},
        {title: "名称", dataIndex: "device_name", key: "device_name"},
        {title: "类型", dataIndex: "device_type", key: "device_type"},
        {title: "创建人", dataIndex: "creator", key: "creator"},
        {title: "创建时间", dataIndex: "create_date", key: "create_date"},
        {title: "最后上线", dataIndex: "last_update_date", key: "last_update_date"},
        {
            title: "操作",
            render: record => {
                return (
                    <div>
                    <Button
                        type="dashed"
                        onClick={showDrawer}
                    >
                        编辑
                    </Button>
                    <Button onClick={() => handleDelete(record.id)}>
                    删除
                    </Button>

                    </div>
                    
                    
                );
            }
        },

    ];

    // 初始化时候请求一次数据
    useEffect(() => {
        
        pageChange(page, pageSize);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [props.deviceType]);

    // 点击下面的分页按钮触发的方法
    const pageChange = useCallback(
        (currentPage, currentSize) => {
            // eslint-disable-next-line
            setPage((page = currentPage === undefined ? page : currentPage));
            // eslint-disable-next-line
            setPageSize(
                // eslint-disable-next-line
                (pageSize = currentSize === undefined ? pageSize : currentSize)
            );
        },
        // eslint-disable-next-line
        
    );

    // 获取数据
    //TODO: 界面初始化
    const fetchData = async () => {
        // 开始加载
        setLoad(true);

        let postData = {
            device_type: props.deviceType
        };

        axios.post(server + `api/device_api/getTypeDevice `, postData).then(res => {
            setTableData(res.data.devices);
        }).catch(err => {
            message.error("获取" + props.deviceType + "设备失败");
            setTableData( [  
                {  
                  device_id: "001",  
                  device_name: "Product A",  
                  device_type: "智能物联网设备",
                  creator: "John Doe",  
                  online: 1,
                  create_date: "2023-01-15",  
                  last_update_date: "2024-04-10",
                  description: "asd"
                },  
                {  
                  device_id: "002",  
                  device_name: "Product B",  
                  creator: "John Doe",  
                  device_type: "智能穿戴设备",
                  online: 1,
                  create_date: "2023-01-15",  
                  last_update_date: "2024-04-10" ,
                  description: "asd"
                },  
                // 可以继续添加更多数据项  
              ])
        });
        

        // 加载完成
        setLoad(false);
    };

    // 点击搜索按钮触发的方法
    //TODO: 查询指定设备
    const searchData = e => {
        let postData = {
            device_id: e.device_id,
            device_name: e.device_name,
            device_type: typeMapping[e.device_type]
        };
        axios.post(server + `api/device_api/getDefinedDevice  `, postData).then(res => {
            setTableData(res.data.devices);
        }).catch(err => {
            message.error("获取指定设备失败");
            setTableData( [  
                {  
                  device_id: "001",  
                  device_name: "Product A",  
                  device_type: "智能物联网设备",
                  creator: "John Doe",  
                  online: 1,
                  create_date: "2023-01-15",  
                  last_update_date: "2024-04-10",
                  description: "asd"
                },  
                {  
                  device_id: "002",  
                  device_name: "Product B",  
                  creator: "John Doe",  
                  device_type: "智能穿戴设备",
                  online: 1,
                  create_date: "2023-01-15",  
                  last_update_date: "2024-04-10" ,
                  description: "asd"
                },  
                // 可以继续添加更多数据项  
              ])
        });
    };

    //TODO: 设备修改逻辑
    const submitEdit = e => {
        e.preventDefault();

    };

    //TODO: 设备修改逻辑
    const submitCreate = e => {
        
        e.preventDefault();

    };

    const formReset = () => {

    };

    return (
        <Layout>
            <Row className="base-style">
                <Collapse defaultActiveKey={["1"]} style={{marginBottom: "20px"}}>
                    <Panel header="搜索设备" key="1">
                    <Form  
                        onFinish={searchData}  
                        className="list"  
                        autoComplete="off"  
                        layout="inline"  
                        name="basic"  
                    >  
                        <Form.Item name="device_id" rules={[{ required: false }]}>  
                            <Input prefix={<UserOutlined />} placeholder="设备编号" style={{ width: 170 }}   />  
                        </Form.Item>  
                        <Form.Item name="device_name" rules={[{ required: false }]}>  
                            <Input prefix={<FormOutlined />} placeholder="设备名称" />  
                        </Form.Item>  
                        <Form.Item name="device_type" rules={[{ required: false }]}>  
                            <Select  
                                showSearch  
                                style={{ width: 150 }}  
                                placeholder="设备类型"  
                                optionFilterProp="children"  
                                filterOption={(input, option) =>  
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0  
                                }  
                            >  
                                <Option value="0">智能物联网设备</Option>  
                                <Option value="1">智能穿戴设备</Option>  
                                <Option value="2">智能家居设备</Option>  
                                <Option value="3">智能物流设备</Option>  
                                <Option value="4">智能飞行器设备</Option>  
                                <Option value="5">智能互联网设备</Option>  
                                <Option value="6">智能无线设备</Option>  
                                <Option value="7">其他</Option>  
                            </Select>  
                        </Form.Item>  
                        <Form.Item>  
                            <Button type="primary" htmlType="submit">  
                                查询  
                            </Button>  
                            <Button style={{ marginLeft: 8 }} onClick={formReset}>  
                                重置  
                            </Button>  
                        </Form.Item>  
                    </Form>  
                    </Panel>
                </Collapse>
            </Row>
            <Row className="base-style">
                <Row>
                    <Table
                        rowKey="id"
                        columns={columns}
                        loading={load}
                        dataSource={tableData}
                        scroll={{y: 300}}
                        rowSelection={{
                            // row selection
                            onChange: (selectedRowKeys, selectedRows) => {
                                setShowRecord(selectedRows);
                            },
                            type: "radio",
                            getCheckboxProps: record => ({
                                name: record.name
                            })
                        }}
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
                    />
                </Row>
                <Row>
                    <Button
                        type="primary" onClick={showDrawer} icon={<PlusOutlined />}
                    >
                        创建设备
                    </Button>
                </Row>
            </Row>
            <Row gutter={[16, 16]}>
                <DeviceData record={showRecord}/>
            </Row>

            <Drawer
                
                width={600}
                onClose={onClose}
                open={open}
                styles={{
                body: {
                    paddingBottom: 80,
                },
                }}
                extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose} type="primary">
                    Submit
                    </Button>
                </Space>
                }
            >
                <Form layout="vertical" >
                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                        name="设备名称"
                        label="Name"
                        rules={[
                        {
                            required: true,
                            message: '请输入设备名称！',
                        },
                        ]}
                    >
                        <Input
                        style={{
                            width: '100%',
                        }}
                        placeholder="Device name"
                        />
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item
                        name="owner"
                        label="Owner"
                        rules={[
                        {
                            required: true,
                            message: 'Please select an owner',
                        },
                        ]}
                    >
                        <Select placeholder="Please select an owner">
                        <Option value="xiao">Xiaoxiao Fu</Option>
                        <Option value="mao">Maomao Zhou</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[
                        {
                            required: true,
                            message: 'Please choose the type',
                        },
                        ]}
                    >
                        <Select placeholder="Please choose the type">  
                            {Object.keys(typeMapping).map(key => (  
                                <Option key={key} value={key}>  
                                    {typeMapping[key]}  
                                </Option>  
                            ))}  
                        </Select>  
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item
                        name="在线状态"
                        label="Online"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Select placeholder="请选择在线状态">  
                            {Object.keys(onlineMapping).map(key => (  
                                <Option key={key} value={key}>  
                                    {onlineMapping[key]}  
                                </Option>  
                            ))}  
                        </Select>  
                    </Form.Item>
                    </Col>
                </Row>
                
                <Row gutter={16}>
                    <Col span={24}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                        {
                            required: true,
                            message: 'please enter url description',
                        },
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder="please enter url description" />
                    </Form.Item>
                    </Col>
                </Row>
                </Form>
            </Drawer>
        </Layout>
    );
};



export default DeviceInfo;  
