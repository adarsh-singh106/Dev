import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import PostDetails from '../components/PostDetails';
import Explore from '../components/Explore';
import LandingPage from '../components/LandingPage';
import About from '../components/About';
import Contact from '../components/Contact';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/post/:id' element={<PostDetails/>}/>
        <Route path='/blog' element={<Home/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
    </Routes>
  )
}

export default AppRoutes;