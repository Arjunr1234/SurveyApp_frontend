import './App.css'
import {Routes, Route} from 'react-router-dom'
import AdminRoute from './routes/AdminRoute'
// import UserRoutes from './routes/userRoutes'
import UserRoutes from './routes/UserRoute'





function App() {

 return (
    <>
      <Routes>
          <Route path='/admin/*' element={<AdminRoute/>}/>
          <Route path='/*' element={<UserRoutes/>}/>
      </Routes>
    </>
  )
}

export default App
