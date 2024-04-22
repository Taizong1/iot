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
    Drawer
} from "antd";
import "./style.css"
import {withRouter} from "react-router-dom";

import {UserOutlined, FormOutlined,PlusOutlined} from "@ant-design/icons";
import DeviceData from "./DeviceData";

const {Panel} = Collapse;
const {Option} = Select;
const {TextArea} = Input;

const DeviceInfo : React.FC = () => {
     
    // 抽屉
    const [open, setOpen] = useState(false);
    let [editRecord, setEditRecord] = useState(null);

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

    // 表格数据
    const tableData = [  
        {  
          code: "001",  
          name: "Product A",  
          type: "type1",  
          creatorName: "John Doe",  
          createTime: "2023-01-15",  
          updateTime: "2024-04-10"  
        },  
        {  
          code: "002",  
          name: "Product B",  
          type: "type2",  
          creatorName: "Jane Smith",  
          createTime: "2022-11-30",  
          updateTime: "2024-03-20"  
        },  
        // 可以继续添加更多数据项  
      ];  

    // loading状态
    let [load, setLoad] = useState(false);

    // 选择的设备
    let [showRecord, setShowRecord] = useState([]);

    const handleDelete = deleteid => {
        const confirmed = window.confirm("确定要删除吗？");
        if (confirmed) {
            // 获取修改结果
            let postData = {
                id: deleteid
            };
            message.info(postData)
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

    const columns = [
        {title: "编号", dataIndex: "code", key: "code"},
        {title: "名称", dataIndex: "name", key: "name"},
        {title: "类型", dataIndex: "type", key: "type",render: type => typeMapping[type] || ""},
        {title: "创建人", dataIndex: "creatorName", key: "creatorName"},
        {title: "创建时间", dataIndex: "createTime", key: "createTime"},
        {title: "最后上线", dataIndex: "updateTime", key: "updateTime"},
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
            code: filter.code,
            name: filter.name,
            creatorName: filter.creatorName,
            type: filter.type,
            startTime: filter.startTime,
            endTime: filter.endTime
        };
        

        // 加载完成
        setLoad(false);
    };

    // 点击搜索按钮触发的方法
    const searchData = e => {

    };

    const submitEdit = e => {
        e.preventDefault();

    };

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
                        className="list"  
                        autoComplete="off"  
                        layout="inline"  
                        name="basic"  
                        onSubmit={searchData}  
                    >  
                        <Form.Item name="code" rules={[{ required: false }]}>  
                            <Input prefix={<UserOutlined />} placeholder="设备编号" style={{ width: 170 }}   />  
                        </Form.Item>  
                        <Form.Item name="name" rules={[{ required: false }]}>  
                            <Input prefix={<FormOutlined />} placeholder="设备名称" />  
                        </Form.Item>  
                        <Form.Item name="type" rules={[{ required: false }]}>  
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
                        name="设备编号"
                        label="ID"
                        rules={[
                        {
                            required: true,
                            message: '请输入设备编号（唯一）！',
                        },
                        ]}
                    >
                        <Input placeholder="Device id" />
                    </Form.Item>
                    </Col>
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
                </Row>
                <Row gutter={16}>
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
