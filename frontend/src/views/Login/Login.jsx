import { Form, Input, Button, message, notification, Layout, Divider } from 'antd';  
import { UserOutlined, LockOutlined } from '@ant-design/icons';  
import { useState, useEffect } from 'react';  
import { useNavigate } from "react-router-dom"; 
import "./style.css";

const Login = () => {  
    const [loading, setLoading] = useState(false);  
    const [form] = Form.useForm();  
    const navigate = useNavigate(); 
  
    const handleSubmit = async () => {  
        try {  
            const values = await form.validateFields();  
            let { username, password } = values;  
            let postData = {  
                name: username,  
                password: password  
            };  
            // 提交
            console.log('Submit:',postData);  
        } catch (errorInfo) {  
            console.log('Failed:', errorInfo);  
        }  
    };  
  
    useEffect(() => {  
        notification.open({  
            message: "Welcome to the IoT Device Management Platform",  
            duration: null,  
            description: "Admin account: admin(admin), other visitors please register before using the platform"  
        });  

        return () => {  
            notification.destroy();  
        };  
        // eslint-disable-next-line  
    }, []);  
  
    return (  
        <Layout className="login animated fadeIn">  
            <div className="model">  
                <div className="login-form">  
                    <h3>物联网设备管理系统</h3>  
                    <Divider/>  
                    <Form form={form} onFinish={handleSubmit}>  
                        <Form.Item  
                            name="username"  
                            rules={[{ required: true, message: "请输入用户名!" }]}  
                        >  
                            <Input prefix={<UserOutlined/>} placeholder="用户名"/>  
                        </Form.Item>  
                        <Form.Item  
                            name="password"  
                            rules={[{ required: true, message: "请输入密码" }]}  
                        >  
                            <Input  
                                prefix={<LockOutlined/>}  
                                type="password"  
                                placeholder="密码"  
                            />  
                        </Form.Item>  
                        <Form.Item>  
                            <Button  
                                type="primary"  
                                htmlType="submit"  
                                className="login-form-button"  
                                loading={loading}  
                            >  
                                登录  
                            </Button>  
                            <Button  
                                type="dashed"  
                                className="login-form-button"  
                                onClick={event => {  
                                    navigate("/register");  
                                }}  
                            >  
                                注册  
                            </Button>  
                        </Form.Item>  
                    </Form>  
                </div>  
            </div>  
        </Layout>  
    );  
};  
  
export default Login;  