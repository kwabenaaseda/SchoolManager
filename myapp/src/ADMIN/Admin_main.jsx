import { Route, Routes } from 'react-router-dom'
import Settings from './Settings/Settings_manager.jsx'
import Student_manager from './Student_manager/Student_manager.jsx'
import Staff_manager from './Staff_manager/Staff_manager.jsx'
import Reports_manager from './Reports_manager/Reports_manager.jsx'
import Parent_manager from './Parent_manager/Parent_manager.jsx'
import Finance_manager from './Finance_manager/Finance_manager.jsx'
import DashBaord from './DashBoard/Dashboard_manager.jsx'
import Courses_manager from './Courses_manager/Course_manager.jsx'
import Signup_manager from './Auth/Signup_manager.jsx'
import Login_manager from './Auth/Login_manager.jsx'
import Annoucement_manager from './Annoucement_manager/Annoucement_manager.jsx'
import logo from '../assets/LogoIsland.png'
const Admin_main = () => {
  return (
    
       <Routes>
      <Route path="/" element={<DashBaord />} />
      <Route path="/settings/*" element={<Settings />} />
      <Route path="/students/*" element={<Student_manager />} />
      <Route path="/staff/*" element={<Staff_manager />} />
      <Route path="/reports/*" element={<Reports_manager />} />
      <Route path="/parents/*" element={<Parent_manager />} />
      <Route path="/finance/*" element={<Finance_manager />} />
      <Route path="/courses/*" element={<Courses_manager />} />
      <Route path="/signup/*" element={<Signup_manager />} />
      <Route path="/login/*" element={<Login_manager />} />
      <Route path="/announcements/*" element={<Annoucement_manager />} />
      <Route path="*" element={<div className='NOPAGE'>
     <img src={logo} alt="logo" />
           <h1>404 - Page Not Found</h1>
           </div>} />
       </Routes>
    
  )
}

export default Admin_main
