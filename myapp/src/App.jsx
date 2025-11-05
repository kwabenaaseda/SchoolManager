import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin_main from './ADMIN/Admin_main'
import './Globals/index.css'
import Web_main from "./Web/Web_main";
import HomePage from "./Web/Pages/HomePage";

function App() {
  return (
    <Routes>

      <Route path="/*" element={<Web_main/>}/>
      <Route path="/admin/*" element={<Admin_main/>} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
