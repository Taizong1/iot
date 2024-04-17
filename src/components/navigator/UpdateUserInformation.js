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
import axios from 'axios';

import Footer from '../Footer';
import user_avator from "../../assets/images/default.png"
import { useDispatch } from 'react-redux';
import { store } from '../reducer/store';

const server = "http://10.192.72.230:8080";

function UpdateUserInformation() {
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

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
            newPassword: newPassword,
            oldPassword: oldPassword,
            userName: userName
        }
        
        axios.post(server + "/updatePassword", data).then((response) => {
            if (response.data.state === 0) {
                alert(response.data.message);
            }
            else {
                alert("更新成功");
            }
        });

    };
    
    const SubmitChange = () => {
        const data = {
            emailAddress: emailAddress,
            phoneNo: phoneNo,
            userName: userName,
        }
        
        axios.post(server + "/api/updateInfor", data).then((response) => {
            if (response.data.state === 0) {
                alert(response.data.message);
            }
            else {
                alert("更新成功");
            }
        });

    };
    const handleAvatarChange = () => {
        let formData = new FormData();
        const fileInput = document.getElementById('customFile');
        const file = fileInput.files[0];
        console.log(file);
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
                                               <MDBInput wrapperClass='mb-4' label='新登入密码' id='form3' type='password' value={newPassword} onChange={handleNewPasswordChange}/>
                                           </MDBCol>

                                           <MDBCol col='6'>
                                               <MDBInput wrapperClass='mb-4' label='旧登入密码' id='form4' type='password' value={oldPassword} onChange={handleOldPasswordChange}/>
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