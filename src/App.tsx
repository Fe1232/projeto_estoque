import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Home from './Home'
import Login from './Login'
import MainPage from './MainPage';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main_page" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </>)
}

export default App
