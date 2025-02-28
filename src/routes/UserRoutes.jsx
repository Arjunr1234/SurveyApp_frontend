import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SignIn from '../pages/user/SignIn'
import Signup from '../pages/user/Signup'
import Home from '../pages/user/Home'
import SubmittedForms from '../pages/user/SubmittedForms'
import FormPage from '../pages/user/FormPage'
import ProtectedRoute from '../utils/ProtectedRoute'

function UserRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<ProtectedRoute role='user'/>}>
           <Route path="home" element={<Home />} />
           <Route path='view' element={<SubmittedForms/>}/>
           <Route path='form' element={<FormPage/>}/>
        </Route>
        
      </Routes>
    
    </>
  )
}

export default UserRoutes
