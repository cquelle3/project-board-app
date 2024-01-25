import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import React, { useEffect, useState } from 'react'
import AuthService from './services/authService'
import ProtectedRoute from './components/protectedRoute'

export const AuthContext = React.createContext(null);

function App() {
  const [authInfo, setAuthInfo] = useState(null);

  //if we have an access token already, set global authentication info
  useEffect(() => {
    async function onLoad(){
      let accessToken = localStorage.getItem('accessToken');
      if(accessToken){
        let res = await AuthService.verify(accessToken);
        if(res.status === 200){
          let resInfo = res.data.verified;
          setAuthInfo({ userId: resInfo.userId, accessToken: accessToken, username: resInfo.username });
        }
      }
    }
    onLoad();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ authInfo: authInfo, setAuthInfo: setAuthInfo }}>
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard' replace={true} />} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/register' element={<Register></Register>} />
          <Route path='/dashboard/*' element={<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>} />
        </Routes> 
      </AuthContext.Provider>
    </>
  )
}

export default App
