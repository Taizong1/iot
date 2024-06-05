import { Form, Input, Button, message, notification, Layout, Divider } from 'antd';  
import { UserOutlined, LockOutlined } from '@ant-design/icons';  
import { useState, useEffect } from 'react';  
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { userLogin, updateUserInfo } from "../../components/reducer/action";
import "./style.css";
import axios from 'axios';

const server = "http://10.214.241.121:8080";

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
                userName: username,  
                password: password  
            };  
            if ( username === "" || password === "" ) {
                message.error("请填写完整信息");
                return;
            }
            
            /* 测试代码 */
            // message.success("登陆成功");
            // dispatch(userLogin(username, 0));
            // navigate('/reference');
            /* 测试代码 */

            // 提交
            axios.post(server + "/api/login", postData).then((response) => {
                if (response.data.state === 0) {
                    message.error(response.data.message);
                }
                else {
                    message.success("登陆成功");
                    dispatch(userLogin(username, 0));
                    return axios.post(server + "/api/showInfo",postData)
                }
            })
            .then((response)=>{
                if (response) {
                    dispatch(updateUserInfo(response.data.user.email, response.data.user.phone))
                    navigate('/index');
                }
            })
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
