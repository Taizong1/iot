import React from "react";    
import Register from "./views/Register"
import View404 from  "./views/Others/404"
import { Routes, Route ,Navigate} from 'react-router-dom';  
import Login from "./views/Login";
import Reference from "./views/reference/reference";
const DefaultLayout = React.lazy(() => import('./containers'));  
const App = () => (  
  <Routes>
      <Route path="/reference" element={<Reference />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<DefaultLayout />} />
    <Route path="/404" element={<View404 />} />
  </Routes>  
);  
  
export default App;  