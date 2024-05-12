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
import { useForm } from "antd/es/form/Form";

import {store} from '../../components/reducer/store';


const server = "http://10.214.241.121:8080";

const {Panel} = Collapse;
const {Option} = Select;
const {TextArea} = Input;

const DeviceInfo = props => {
     
    // 抽屉
    const [open, setOpen] = useState(false);
    let [editRecord, setEditRecord] = useState(null);
    let [isEdit, setIsEdit] = useState(0);
    let [tableData, setTableData] = useState([]);

    // 搜索条件
    let filter = {
        code: null,
        name: null,
        type: null
    };

    const [form] = Form.useForm();
    const [deviceForm] = Form.useForm();


    // 设置分页
    let [total, setTotal] = useState(0);
    let [page, setPage] = useState(1);
    let [pageSize, setPageSize] = useState(10);

    // loading状态
    let [load, setLoad] = useState(false);

    // 选择的设备
    let [showRecord, setShowRecord] = useState([]);

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
                    let newTableData = tableData.filter((item, index )=> index !== deleteid);
                    setTableData(newTableData);
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
                        onClick={()=>{
                            deviceForm.resetFields();
                            setOpen(true);
                            setIsEdit(1);
                            setEditRecord(record);
                        }}
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

    const deviceCreateOrUpdate = e => {
        console.log(e)
        if(isEdit === 1){//编辑
            let postData = {
                device_id: editRecord.device_id,
                device_name: e.device_name,
                device_type: e.device_type,
                online: e.online,
                description: e.description
            };
            axios.post(server + `api/device_api/modifyDevice`, postData).then(res => {
                let newTableData = tableData;
                let index = tableData.findIndex(item => item.device_id === editRecord.device_id);
                newTableData[index] = {
                  device_id: editRecord.device_id,
                  device_name: e.device_name,
                  device_type: e.device_type,
                  online: e.online,
                  creator: editRecord.creator,
                  create_date: editRecord.creator, 
                  last_update_date: new Date().now(),
                  description: e.description
                }
                setTableData(newTableData);
            }).catch(err => {
                message.error("编辑指定设备失败");
            });
        }else{//创建
            let postData = {
                device_name: e.device_name,
                device_type: e.device_type,
                creator: e.creator,
                online: e.online,
                description: e.description
            };
            axios.post(server + `api/device_api/createDevice`, postData).then(res => {
                if(e.device_type === props.deviceType){
                    let newTableData = tableData;
                    newTableData.push({
                        device_id: res.data.device_id,
                        device_name: e.device_name,
                        device_type: e.device_type,
                        online: e.online,
                        creator: editRecord.creator,
                        create_date: new Date().now(), 
                        last_update_date: new Date().now(),
                        description: e.description
                    })
                    setTableData(newTableData);
                }
            }).catch(err => {
                message.error("创建指定设备失败");
            });
        }
    };

    const formReset = () => {
        form.resetFields();
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
                        form = {form}
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
                        rowKey="device_id"
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
                                name: record.device_name
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
                        type="primary" onClick={()=>{
                            deviceForm.resetFields();
                            setOpen(true);
                            setIsEdit(2);
                            setEditRecord(null);
                        }} icon={<PlusOutlined />}
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
                onClose={()=>{setOpen(false);}}
                open={open}
                styles={{
                body: {
                    paddingBottom: 80,
                },
                }}
                extra={
                <Space>
                    <Button onClick={()=>{setOpen(false);}}>Cancel</Button>
                    <Button onClick={()=>{deviceForm.submit();}} type="primary" >Submit</Button>
                </Space>
                }
            >
                <Form layout="vertical"
                    onFinish={deviceCreateOrUpdate} 
                    form = {deviceForm}
                >
                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                        name="device_name"
                        label="Name"
                        rules={[
                        {
                            required: true,
                            message: '请输入设备名称！',
                        },
                        ]}
                        initialValue={editRecord === null ? null : editRecord.device_name}
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
                        name="creator"
                        label="Creator"
                        rules={[
                        {
                            required: true,
                            message: 'Please select an owner',
                        },
                        ]}
                        initialValue={editRecord === null ? store.getState().userName : editRecord.creator}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                            disabled
                        />
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                        name="device_type"
                        label="Device Type"
                        rules={[
                        {
                            required: true,
                            message: 'Please choose the type',
                        }
                        ]}
                        initialValue={editRecord === null ? "其他" : editRecord.device_type}
                    >
                        <Select >  
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
                        name="online"
                        label="Online"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                        initialValue={editRecord === null ? "离线" : onlineMapping[editRecord.online]}
                    >
                        <Select >
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
                        initialValue={editRecord === null ? null : editRecord.description}
                    >
                        <Input.TextArea rows={4} 
                        placeholder="please enter url description" 
                        />
                    </Form.Item>
                    </Col>
                </Row>
                </Form>
            </Drawer>
        </Layout>
    );
};



export default DeviceInfo;  
