import React from 'react' 
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import MainPage from './components/MainPage/MainPage'
import UserSignin from './components/User/UserSignin/UserSignin'
import LoginPage from './components/LoginPage/LoginPage'
import GetCourses from './components/MainPage/GetCourses'
import AdminSignin from './components/Admin/Signin/AdminSignin'
import AdminSignup from './components/Admin/AdminSignup/AdminSignup'
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard'
import UserSignup from './components/User/Signup/UserSignup'
import UserDashboard from './components/User/Dashboard/UserDashboard'
import AddCourse from './components/Admin/coursesDet/AddCourse/AddCourse'
import Adminperspective from './components/Admin/AdminPerspective/Adminperspective'
import EditCard from './components/Admin/AdminPerspective/EditingCard/EditCard'
import UserPerspective from './components/User/userpersp/UserPerspective'
import UserPurchases from './components/User/purchases/UserPurchases'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/courses/preview" element={<GetCourses/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/admin/signin" element={<AdminSignin/>} />
          <Route path="/admin/signup" element={<AdminSignup/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/user/signin" element={<UserSignin/>} />
          <Route path="/user/signup" element={<UserSignup/>} />
          <Route path="/user/dashboard" element={<UserDashboard/>} />
          <Route path="/admin/addcourse" element={<AddCourse/>} />
          <Route path="/admin/perspective" element={<Adminperspective/>} />
          <Route path="/admin/editcourse" element={<EditCard/>} />
          <Route path="/user/perspective" element={<UserPerspective/>} />
          <Route path="/user/purchases" element={<UserPurchases/>} />
        </Routes>

        
      </BrowserRouter>
      
        
     
    </div>
  )
}

export default App