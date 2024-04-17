//import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBFile,
    MDBInput,
    MDBRow
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router';
import { message } from 'antd';  
import axios from 'axios';

import Footer from '../Footer';
import user_avator from "../../assets/images/default.png"
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../reducer/action';
import { store } from '../reducer/store';

const server = "http://10.214.241.121:8080";

function UpdateUserInformation() {
    const [emailAddress, setEmailAddress] = useState(store.getState().emailAddress);
    const [phoneNo, setPhoneNo] = useState(store.getState().phoneNo);
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    useEffect(()=>{
        if(store.getState().isLogin === false){
            navigate('/login')
        }
    })

    const userName = store.getState().userName;
    const handleEmailAddressChange = (event) => {
        setEmailAddress(event.target.value);
    };

    const handlePhoneNoChange = (event) => {
        setPhoneNo(event.target.value);
    };
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };
    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handlePasswordChange = () => {
        const data = {
            newPassword: require('md5')(newPassword),
            oldPassword: require('md5')(oldPassword),
            userName: userName
        }
        
        axios.post(server + "/api/updatePassword", data).then((response) => {
            if (response.data.state === 0) {
                message.error(response.data.message);
            }
            else {
                message.success("更新成功");
                setNewPassword('');
                setOldPassword('');
            }
        });

    };
    
    const SubmitChange = () => {
        const data = {
            emailAddress: emailAddress,
            phoneNo: phoneNo,
            userName: userName,
        }
        
        axios.post(server + "/api/updateInfo", data).then((response) => {
            if (response.data.state === 0) {
                message.error(response.data.message);
            }
            else {
                dispatch(updateUserInfo(emailAddress, phoneNo))
                message.success("更新成功");
            }
        });

    };
    const handleAvatarChange = () => {
        let formData = new FormData();
        const fileInput = document.getElementById('customFile');
        const file = fileInput.files[0];
        // console.log(file);
        formData.append('file', file);
        const Token = localStorage.getItem('Token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);
        //myHeaders.append("Content-Type", 'multipart/form-data');
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        };
        let state = {
            shouldRender: true, // 默认渲染
        };
    };


    return (
       <div>
               <div>
                       <MDBRow className='text-center'>
                           <MDBCol md='3'></MDBCol>
                           <MDBCol md='6' className='position-relative'>

                               <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                               <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                                   <MDBCardBody className='p-5'>
                                       <div className='d-flex flex-row mt-2'>
                                           <span className="h1 fw-bold mb-0">个人中心</span>
                                       </div>
                                       <MDBRow className='p-4'>
                                           <MDBCol col='6' style={{ textAlign: 'left' }}>
                                               <img src= {user_avator} className='rounded-circle shadow-5-strong' alt='' height='140' />
                                           </MDBCol>
                                           <MDBCol col='6'>
                                               <MDBFile label='点击上传文件（.png/.jpg/.jpeg）' id='customFile' onChange={handleAvatarChange}/>
                                           </MDBCol>
                                       </MDBRow>
                                       <MDBInput wrapperClass='mb-4' label='用户名' id='form3' type='text' value={userName} disabled />
                                       <MDBRow>
                                           <MDBCol col='6'>
                                               <MDBInput wrapperClass='mb-4' label='手机号' id='form1' type='text' value={phoneNo} onChange={handlePhoneNoChange}/>
                                           </MDBCol>

                                           <MDBCol col='6'>
                                               <MDBInput wrapperClass='mb-4' label='邮箱' id='form2' type='email' value={emailAddress} onChange={handleEmailAddressChange}/>
                                           </MDBCol>
                                       </MDBRow>
                                       <MDBRow>
                                            <MDBCol col='6'>
                                                <MDBInput wrapperClass='mb-4' label='旧登入密码' id='form4' type='password' value={oldPassword} onChange={handleOldPasswordChange}/>
                                            </MDBCol>
                                           <MDBCol col='6'>
                                               <MDBInput wrapperClass='mb-4' label='新登入密码' id='form3' type='password' value={newPassword} onChange={handleNewPasswordChange}/>
                                           </MDBCol>
                                           <MDBCol col='6'>
                                               <MDBBtn className='w-80 mb-4' size='md' onClick={handlePasswordChange}>修改登入密码</MDBBtn>
                                           </MDBCol>
                                       </MDBRow>

                                       <div className='d-flex justify-content-center mb-4'>
                                           {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' /> */}
                                       </div>
                                       
                                       <MDBBtn className='w-100 mb-4' size='md' onClick={SubmitChange}>保存</MDBBtn>

                                       {/*<div className="text-center">

                                </div>*/}

                                   </MDBCardBody>

                           </MDBCol>
                           <MDBCol md='3'></MDBCol>
                       </MDBRow>
               </div>
       </div>
    );
}

export default UpdateUserInformation;