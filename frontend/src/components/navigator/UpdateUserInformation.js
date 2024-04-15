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
import user_avator from "../../assets/images/default.png"
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

    const [realName, setRealName] = useState('');
    const [cardId, setCardId] = useState('');
    const userId = localStorage.getItem('userId');

    const [fee] = useState('10');
    const [paymentPassword, setPaymentPassword] = useState('');


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

        /*fetch(`http://${backendPort}/api/v1/buyer/upgrade-vip`, requestOptions)
            .then(reponse => reponse.json())
            .then(result => {
                console.log(result);
                if(result.statusCode == 'SUCCESS'){
                    let balance = parseFloat(localStorage.getItem('balance'));
                    let fee_num = parseFloat(fee);
                    balance -= fee_num;
                    localStorage.setItem('balance', balance.toString());
                    setVipst('尊贵会员');
                }else{
                    alert(result.message);
                }
            })
            .catch(error => console.log('error', error));*/
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

        /*fetch(`http://${backendPort}/api/v1/user/update-info`, requestOptions)
            .then(reponse => reponse.json())
            .then(result => {
                console.log(result);
                if(result.statusCode == 'SUCCESS'){
                    alert(result.message);
                }else{
                    alert(result.message);
                }
            })
            .catch(error => console.log('error', error));*/
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
        /*fetch(`http://${backendPort}/api/v1/user/upload-avatar`, requestOptions)
            .then(reponse => reponse.json())
            .then(result => {
                console.log(result);
                if(result.statusCode == 'SUCCESS'){
                    localStorage.setItem('avatarUuid', result.data);
                    setAvatarUuid(localStorage.getItem('avatarUuid'));
                    console.log(avatarUuid);
                }else{

                }
            })
            .catch(error => console.log('error', error));*/
        let state = {
            shouldRender: true, // 默认渲染
        };
    };


    return (
       <div>
           {new_token != '' ? (
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
                                       <MDBInput wrapperClass='mb-4' label='用户名' id='form3' type='text' value={realName} onChange={handleRealNameChange} disabled />
                                       <MDBInput wrapperClass='mb-4' label='身份证号' id='form4' type='text' value={cardId} onChange={handleCardIdChange} disabled />
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
                                               <MDBInput wrapperClass='mb-4' label='新登入密码' id='form5' type='password' value={newPassword} onChange={handleNewPasswordChange}/>
                                           </MDBCol>
                                           <MDBCol col='6'>
                                               <MDBInput wrapperClass='mb-4' label='旧登入密码' id='form6' type='password' value={oldPassword} onChange={handleOldPasswordChange}/>
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
           ):(
               <div>
                   <MDBContainer className="my-5 text-center">
                       <h1>Page not found.</h1>
                   </MDBContainer>
                   <Footer />
               </div>
           )}
       </div>
        /* <div>
            <Header />
            <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
                <Modal show={showModal} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>充值Vip</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>请输入支付密码</h5>
                        <MDBInput wrapperClass='mb-4' label='支付密码' id='form5' type='password' value={paymentPassword} onChange={handlePaymentPassword}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancel}>
                            取消
                        </Button>
                        <Button variant="primary" onClick={() => {
                            handleTopup();
                            handleConfirm();
                        }}>
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
                                        <img src= {`http://10.188.39.155:8080${avatarUuid}`} className='rounded-circle shadow-5-strong' alt='' height='140' />
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <MDBFile label='点击上传文件（.png/.jpg/.jpeg）' id='customFile' onChange={handleAvatarChange}/>
                                    </MDBCol>
                                </MDBRow>
                                <MDBInput wrapperClass='mb-4' label='实名' id='form3' type='text' value={realName} disabled />
                                <MDBInput wrapperClass='mb-4' label='身份证号' id='form4' type='text' value={cardId} disabled />
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
                                        <MDBInput wrapperClass='mb-4' label='新登入密码' id='form5' type='password' value={newPassword} onChange={handleNewPasswordChange}/>
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='旧登入密码' id='form6' type='password' value={oldPassword} onChange={handleOldPasswordChange}/>
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <MDBBtn className='w-80 mb-4' size='md' onClick={handlePasswordChange}>修改登入密码</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol col='4'>
                                        <MDBInput wrapperClass='mb-4' label='新支付密码' id='form7' type='password' value={newPaymentPassword} onChange={handleNewPaymentPasswordChange}/>
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='旧支付密码' id='form8' type='password' value={oldPaymentPassword} onChange={handleOldPaymentPasswordChange}/>
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <MDBBtn className='w-80 mb-4' size='md' onClick={handlePaymentPasswordChange}>修改支付密码</MDBBtn>
                                    </MDBCol>
                                </MDBRow>

                                <div className='d-flex justify-content-center mb-4'>
                                    {/!* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' /> *!/}
                                </div>
                                <MDBRow>
                                    <MDBCol col='4'>
                                        <h5>用户身份：<b>{vipst}</b></h5>
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <MDBBtn className='w-100 mb-4' size='md' onClick={ClickVip}>{vipst2}</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBBtn className='w-100 mb-4' size='md' onClick={SubmitChange}>保存</MDBBtn>

                                {/!*<div className="text-center">

                                </div>*!/}

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                    <MDBCol md='3'></MDBCol>
                </MDBRow>
            </MDBContainer>
            <Footer />
        </div>*/
    );
}

export default UpdateUserInformation;