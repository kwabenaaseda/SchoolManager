import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin_main from './ADMIN/Admin_main'
import './Globals/index.css'
function Home(){
  return(
    <div>
      <h1>Home</h1>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/admin/*" element={<Admin_main/>} />
    </Routes>
  );
}

export default App;
