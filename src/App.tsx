import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Home from './Home'
import Login from './Login'
import MainPage from './MainPage';
import RegisterToProduct from './RegisterToProduct';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main_page" element={<MainPage key="main" />} />
        <Route path="register_to_product" element={<RegisterToProduct key="reg" />} />
      </Routes>
    </BrowserRouter>
  </>)
}

export default App
