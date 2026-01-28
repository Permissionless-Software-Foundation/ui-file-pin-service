import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import useAppState from './hooks/state';

import './App.css';


function App() {
  const appData = useAppState()

  return (
    <>
      <Routes>
        <Route path="/" element={<div style={{ padding: '20px', textAlign: 'center' }}>
          Welcome to File Pin Service
          <button onClick={appData.logout}>Logout</button>
          
          </div>} />
        <Route path="/login" element={<Login appData={appData} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
