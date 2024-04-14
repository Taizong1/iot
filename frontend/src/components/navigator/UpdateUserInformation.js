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
import Footer from '../Footer';

function UpdateUserInformation() {
    const new_token = localStorage.getItem('Token');
    useEffect(
        () => {
            GetUserInfo();
        }, []
    );
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPaymentPassword, setNewPaymentPassword] = useState('');
    const [oldPaymentPassword, setOldPaymentPassword] = useState('');
    const [avatarUuid, setAvatarUuid] = useState('');
    const [realName, setRealName] = useState('');
    const [cardId, setCardId] = useState('');
    const userId = localStorage.getItem('userId');
    const [vipst, setVipst] = useState('');
    const [vipst2, setVipst2] = useState('充值');
    const [fee] = useState('10');
    const [paymentPassword, setPaymentPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const ClickVip =()=>{
      setShowModal(true);
    };
    const handleCancel = () => {
        setPaymentPassword('');
        setShowModal(false);
    };
    const handleConfirm = () => {
        setPaymentPassword('');
        setShowModal(false);
        // do something
    };
    const handlePaymentPassword = (event) => {
        setPaymentPassword(event.target.value);
    }
    const handleTopup = () => {
        const data = {
            fee: fee,
            paymentPassword: paymentPassword
        }
        console.log(fee);
        const Token = localStorage.getItem('Token');
        console.log(Token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };
    }

    const handleEmailAddressChange = (event) => {
        setEmailAddress(event.target.value);
    };

    const handleCardIdChange = (event) => {
        setCardId(event.target.value);
    };
    const handleRealNameChange = (event) => {
        setRealName(event.target.value);
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
    const handleNewPaymentPasswordChange = (event) => {
        setNewPaymentPassword(event.target.value);
    };
    const handleOldPaymentPasswordChange = (event) => {
        setOldPaymentPassword(event.target.value);
    };

    const GetUserInfo = () => {
        const Token = localStorage.getItem('Token');
        console.log(Token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
    }
    const handlePasswordChange = () => {
        const data = {
            newPassword: newPassword,
            oldPassword: oldPassword
        }
        const Token = localStorage.getItem('Token');
        console.log(Token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };
    };
    const handlePaymentPasswordChange = () => {
        const data = {
            newPaymentPassword: newPaymentPassword,
            oldPaymentPassword: oldPaymentPassword
        }
        const Token = localStorage.getItem('Token');
        console.log(Token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };
    };
    const SubmitVip =()=>{
        const data = {
            fee: fee,
            paymentPassword: paymentPassword

        }
        const Token = localStorage.getItem('Token');
        console.log(Token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };
    };
    const SubmitChange = () => {
        const data = {
            emailAddress: emailAddress,
            phoneNo: phoneNo,
            userId: userId
        }
        const Token = localStorage.getItem('Token');
        console.log(Token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };
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
           {new_token != '' ? (
               <div>
                   <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
                       <Modal show={showModal} onHide={handleCancel}>
                           <Modal.Header closeButton>
                               <Modal.Title>修改个人密码</Modal.Title>
                           </Modal.Header>
                           <Modal.Body>
                               <MDBCol col='4'>
                                   <MDBInput wrapperClass='mb-4' label='新支付密码' id='form7' type='password' value={newPaymentPassword} onChange={handleNewPaymentPasswordChange}/>
                               </MDBCol>
                               <MDBCol col='6'>
                                   <MDBInput wrapperClass='mb-4' label='旧支付密码' id='form8' type='password' value={oldPaymentPassword} onChange={handleOldPaymentPasswordChange}/>
                               </MDBCol>
                           </Modal.Body>
                           <Modal.Footer>
                               <Button variant="secondary" onClick={handleCancel}>
                                   取消
                               </Button>
                               <Button variant="primary" onClick={handlePaymentPasswordChange}>
                                   确认
                               </Button>
                           </Modal.Footer>
                       </Modal>
                       <MDBRow className='text-center'>
                           <MDBCol md='3'></MDBCol>
                           <MDBCol md='6' className='position-relative'>

                               <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                               <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                               <MDBCard className='my-5 bg-glass'>
                                   <MDBCardBody className='p-5'>
                                       <div className='d-flex flex-row mt-2'>
                                           <span className="h1 fw-bold mb-0">个人中心</span>
                                       </div>
                                       <MDBRow className='p-4'>
                                           <MDBCol col='6' style={{ textAlign: 'left' }}>
                                               <img src= {` `} className='rounded-circle shadow-5-strong' alt='' height='140' />
                                           </MDBCol>
                                           <MDBCol col='6'>
                                               <MDBFile label='点击上传文件（.png/.jpg/.jpeg）' id='customFile' onChange={handleAvatarChange}/>
                                           </MDBCol>
                                       </MDBRow>
                                       <MDBInput wrapperClass='mb-4' label='实名' id='form3' type='text' value={realName} onChange={handleRealNameChange} disabled />
                                       <MDBInput wrapperClass='mb-4' label='身份证号' id='form4' type='text' value={cardId} onChange={handleCardIdChange} disabled />
                                       <MDBRow>
                                           <MDBCol col='6'>
                                               <MDBInput wrapperClass='mb-4' label='用户名' id='form1' type='text' value={phoneNo} onChange={handlePhoneNoChange}/>
                                           </MDBCol>

                                           <MDBCol col='6'>
                                               <MDBInput wrapperClass='mb-4' label='性别' id='form2' type='email' value={emailAddress} onChange={handleEmailAddressChange}/>
                                           </MDBCol>
                                       </MDBRow>
                                       <MDBRow>
                                           <MDBCol col='6'>
                                               <MDBInput wrapperClass='mb-4' label='手机号' id='form1' type='text' value={phoneNo} onChange={handlePhoneNoChange}/>
                                           </MDBCol>

                                           <MDBCol col='6'>
                                               <MDBInput wrapperClass='mb-4' label='邮箱' id='form2' type='email' value={emailAddress} onChange={handleEmailAddressChange}/>
                                           </MDBCol>
                                       </MDBRow>

                                       <div className='d-flex justify-content-center mb-4'>
                                           {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' /> */}
                                       </div>
                                       <MDBRow>
                                           <MDBCol col='6'>
                                               <MDBBtn className='w-100 mb-4' size='12' onClick={ClickVip}>修改密码</MDBBtn>
                                           </MDBCol>
                                       </MDBRow>
                                       <MDBBtn className='w-100 mb-4' size='12' onClick={SubmitChange}>保存</MDBBtn>

                                       {/*<div className="text-center">

                                </div>*/}

                                   </MDBCardBody>
                               </MDBCard>

                           </MDBCol>
                           <MDBCol md='3'></MDBCol>
                       </MDBRow>
                   </MDBContainer>
               </div>
           ):(
               <div>
                   <MDBContainer className="my-5 text-center">
                       <h1>Page not found.</h1>
                   </MDBContainer>
                   <Footer />
               </div>
           )}
       </div>
    );
}

export default UpdateUserInformation;