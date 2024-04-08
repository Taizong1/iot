import React from "react";  
import Login from "./views/Login";  
import Register from "./views/Register"
import View404 from  "./views/Others/404"
import { Routes, Route ,Navigate} from 'react-router-dom';  
  
const App = () => (  
  <Routes>  
    <Route path="/" element={<Navigate to="/login" />} />  
    <Route path="/login" element={<Login />} /> 
    <Route path="/register" element={<Register />} /> 
    <Route path="/404" element={<View404 />} />
  </Routes>  
);  
  
export default App;  