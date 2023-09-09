import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/SignupFlow/Login';

import Register from './components/SignupFlow/Register'
import Home from './components/HomeFlow/Home'
import Profile from './components/SignupFlow/Profile'
import Game from './components/Gamification/Game'
import Translation from './components/SinglishTyping/singlish'



function App() {
  const isLoggedIn = localStorage.getItem('loggedIn');

  return (
    <Router>
      <Routes>

        <Route exact path="/" element={isLoggedIn=="true" ? <Home/> : <Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="sin" element={<Translation />} />

      </Routes>

  

    </Router>
  );
}

 

export default App;