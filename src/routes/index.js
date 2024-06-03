import React, { Suspense } from "react";  
import { Route, Switch } from "react-router-dom";  
  
import Index from "../views/Index";  
import Reference from "../views/reference";  
  
import Device from "../views/Device"; 
import { exact } from "prop-types";
import Screen from "../views/Screen";  
//const Device = React.lazy(() => import(/* webpackChunkName: 'device' */ "../views/Device"));  
//const About = React.lazy(() => import(/* webpackChunkName: 'about' */ "../views/About"));  
const routes = [  
  { path: "/index", exact: true, name: "Index", component: Index, auth: [1] },  
  { path: "/reference", exact: true, name: "Reference", component: Reference, auth: [1] },  
  { path: "/device", exact: true, name: "Device", component: Device, auth: [1] },  
  {path:"/screen",exact:true,name:"Screen",component:Screen,auth:[1]}
  //{ path: "/device", exact: false, name: "设备", component: Device, auth: [1] },  
  //{ path: "/about", exact: false, name: "关于", component: About, auth: [1] }  
];  
  
export default routes;  