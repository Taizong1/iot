import { Form, Input, Button, message, notification, Layout, Divider } from 'antd';  
import { UserOutlined, LockOutlined,MailOutlined, PhoneOutlined } from '@ant-design/icons';  
import { useState, useEffect } from 'react';  
import { useNavigate } from "react-router-dom"; 
import { connect } from "react-redux";
import "./style.css";
import axios from 'axios';

const server = "http://localhost:8080";

const Register = () => {  
    const [loading, setLoading] = useState(false);  
    const [form] = Form.useForm();  
    const navigate = useNavigate(); 
  
    const handleSubmit = async (values) => {  
        try {  
            // const values = await form.validateFields();  
            // console.log(values);
            
            let { username, password, email,phone } = values;  
            if ( username === "" || password === "" || email === "" ) {
                message.error("请填写完整信息");
                return;
            }
            else if (password.length < 6) {
                message.error("密码必须至少包含6个字符");
                return;
            }
            else if (email.indexOf('@') === -1) {
                message.error("请输入有效的邮箱地址");
                return;
            }
            let postData = {  
                user_name: username,  
                password: password, 
                email: email,
                phone: phone,
                md5: require('md5')(password)
            };  
            // 提交
            axios.post(server + "/api/register", postData).then((response) => {
                if (response.data.signal === "fail") {
                    message.error("New account creation failed!");
                }
                else {
                    message.success("注册成功");
                    navigate('/login');
                }
            });

            // console.log('Submit:',postData);  
        } catch (errorInfo) {  
            console.log('Failed:', errorInfo);  
        }  
    };  
  
    return (  
        <Layout className="login animated fadeIn">
            <div className="model">
            <div className="login-form">
                <h3>物联网设备管理系统</h3>
                <Divider />
                <Form 
                    form={form}
                    onFinish={handleSubmit}
                >  
                    <Form.Item  
                        name="username"  
                        rules={[  
                        { required: true, message: "请输入用户名!" },  
                        { min: 6, message: "用户名必须至少包含6个字符!" }  
                        ]}  
                    >  
                        <Input prefix={<UserOutlined />} placeholder="用户名" />  
                    </Form.Item>  
                    <Form.Item  
                        name="password"  
                        rules={[  
                        { required: true, message: "请输入密码" },  
                        { min: 6, message: "密码必须至少包含6个字符!" }  
                        ]}  
                    >  
                        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />  
                    </Form.Item>  
                    <Form.Item  
                        name="email"  
                        rules={[  
                        { required: true, message: "请输入邮箱" },  
                        { type: 'email', message: '请输入有效的邮箱地址' }  
                        ]}  
                    >  
                        <Input prefix={<MailOutlined />} placeholder="邮箱" />  
                    </Form.Item>  
                    <Form.Item  
                        name="phone"  
                        rules={[  
                        { required: true, message: "请输入手机号" },  
                        { type: 'phone', message: '请输入有效的手机号' }  
                        ]}  
                    >  
                        <Input prefix={<PhoneOutlined />} placeholder="手机号" />  
                    </Form.Item> 
                    <Form.Item>  
                        <Button  
                        type="primary"  
                        htmlType="submit"  
                        className="login-form-button"  
                        loading={loading}  
                        >  
                        注册  
                        </Button>  
                        <Button  
                        type="dashed"  
                        className="login-form-button"  
                        onClick={event => {  
                            navigate("/login");  
                        }}  
                        >  
                        登陆  
                        </Button>  
                    </Form.Item>  
                    </Form>  
            </div>
            </div>
        </Layout>
    )
};  
  
export default Register;  