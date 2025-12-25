import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import Sign from '../components/Sign'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/register' element={<Sign/>}/>
        <Route path='/login' element={<Sign/>}/>
    </Routes>
  )
}

export default AppRoutes