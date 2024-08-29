import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/User/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/User/Profile'
import ChangePass from './pages/User/ChangePass'
import Edit from './pages/User/Edit'
import Admin from './pages/Admin/Admin'
import { useSelector } from 'react-redux'

function App() {
  
  const {isLogged , role} = useSelector(state => state.auth)

  return (
    <Router>
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route path='/Login' element={isLogged && role === 'user' ? <Navigate to={'/'}/> : role === 'admin' ? <Navigate to={'/admin'}/> : <Login/> }/>
        <Route path='/SignUp' element={isLogged && role === 'user' ? <Navigate to={'/'}/> : role === 'admin' ? <Navigate to={'/admin'}/> : <SignUp/>}/>
        <Route path='/profile' element={isLogged && role === 'user' ?  <Profile/> : <Navigate to={'/'}/>}/>
        <Route path='/changePass' element={isLogged && role === 'user' ? <ChangePass/> : <Navigate to={'/'}/>}/>
        <Route path='/Edit/:id' element={isLogged && role === 'user' ? <Edit/> : <Navigate to={'/'}/>}/>
        <Route path='/admin' element={isLogged && role === 'admin' ?<Admin/> : <Navigate to={'/'}/>}/>
      </Routes>
    </Router>
  )
}

export default App
