import React, { useState } from "react";
import { NavLink, useMatch, useNavigate } from 'react-router-dom';
import Popup from "../popup/popup";
import "./navigator.css";


const Navigator = () => {
    const componentstyle={
        position:'absolute',
        left:'0px',
        top:'0px'
    }
    var username = localStorage.getItem('username');
    const pageHeight = window.innerHeight;
    const matchReference = useMatch("/reference");
    const matchOrder = useMatch("/order/*");
    const matchAccount = useMatch("/account");
    const matchOrderGood = useMatch("order/good/*");
    const matchOrderTicket = useMatch("order/ticket/*");
    const matchOrderHotel = useMatch("order/hotel/*");

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    function ExitConfirm()
    {
        setShowModal(true);
    }
    function Closepopup()
    {
        setShowModal(false);
    }
    function Linktologin()
    {
        navigate('/');
        setShowModal(false);
    }
    const my_link_style = {
        height:`${pageHeight*0.08}px`
    }
    return(
        <div style={componentstyle} className="nav-container">
            <div style={{fontSize:'25px',fontWeight:'bold',fontFamily:'Microsoft Yahei',marginTop:`${pageHeight*0.05}px`,marginBottom:`${pageHeight*0.02}px`}}>
                <p>个 人 中 心 </p>
            </div>
            <span className="exit" onClick={ExitConfirm}>退     出</span>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div className="nav-portrait">
                    <img src={"http://10.188.39.155:8080"+localStorage.getItem('avatarUuid')} alt="图片错误"/>
                </div>
                <div className="nav-username">
                    <p>{username}</p>
                    <p className="identity">买家</p>
                </div>
            </div>
            
            <ul className="nav-list"> 
                <li className={matchReference?"target-li":"my-link"} style={my_link_style} >
                    <NavLink to='/reference' style={{textDecoration:'none',color:'black',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>个人资料</NavLink>
                </li>
                <li className={matchOrder?"open-order":"my-order"}>
                    <span style={my_link_style}>我的订单</span>
                    <ul>
                        {/* <li style={my_link_style} className={matchOrderGood?"target-li-hidden":"null"}>
                            <NavLink to='/order/good' style={{textDecoration:'none',color:'black',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>商品订单</NavLink>
                        </li> */}
                        <li style={my_link_style} className={matchOrderTicket?"target-li-hidden":"null"}>
                            <NavLink to='/order/ticket' style={{textDecoration:'none',color:'black',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>机票订单</NavLink>
                        </li>
                        <li style={my_link_style} className={matchOrderHotel?"target-li-hidden":"null"}>
                            <NavLink to='/order/hotel' style={{textDecoration:'none',color:'black',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>酒店订单</NavLink>
                        </li>
                    </ul>
                </li>
                <li style={my_link_style} className={matchAccount?"target-li":"my-link"}>
                    <NavLink to='/account' style={{textDecoration:'none',color:'black',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>账户查询</NavLink>
                </li>
                <li style={my_link_style} className="my-link">
                    <NavLink to='/homepage' style={{textDecoration:'none',color:'black',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>返回主页</NavLink>
                </li>
            </ul>
           
            {showModal&&
            <Popup title={"退出确认"}>
                <button onClick={Closepopup} style={{left:'40px'}}>取消</button>
                <button onClick={Linktologin} style={{right:'40px'}}>确认</button>
                <p>是否确认退出登录？</p>
            </Popup>}
        </div>
    );
}

export default Navigator;