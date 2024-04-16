import { Form, Input, Button, message, notification, Layout, Divider } from 'antd';  
import { UserOutlined, LockOutlined } from '@ant-design/icons';  
import { useState, useEffect } from 'react';  
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { userLogin } from "../../components/reducer/action";
import "./style.css";
import axios from 'axios';

const server = "http://localhost:8080";

const Login = () => {  
    const [loading, setLoading] = useState(false);  
    const [form] = Form.useForm();  
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
  
    const handleSubmit = async (values) => {  
        try {  
            // const values = await form.validateFields();  
            let { username, password } = values;  
            // md5加密
            password = require('md5')(password);
            let postData = {  
                user_name: username,  
                md5: password  
            };  
            if ( username === "" || password === "" ) {
                message.error("请填写完整信息");
                return;
            }
            
            /* 测试代码 */
            message.success("登陆成功");
            dispatch(userLogin(username, 0));
            navigate('/reference');
            /* 测试代码 */

            // 提交
            axios.post(server + "/api/account_api/login", postData).then((response) => {
                if (response.data.signal === "fail") {
                    message.error("用户名不存在或密码错误");
                }
                else {
                    message.success("登陆成功");
                    dispatch(userLogin(username, 0));
                    navigate('/reference');
                }
            });
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
  
const mapStateToProps = (state) => {
    return {
        user: state,
    };
};
export default connect(mapStateToProps)(Login);
