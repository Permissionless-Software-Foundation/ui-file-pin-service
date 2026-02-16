import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import useAppState from './hooks/state';
import Explorer from './components/explorer';
import NavMenu from './components/nav-menu/index';
import IpfsStatus from './components/ipfs-status';
import './App.css';


function App() {
  const appData = useAppState()

  return (
    <>
      {/** hide navbar on login page */}
      {appData.currentPath === '/login' ? null : (
        <NavMenu appData={appData} />
      )}
      <Routes>
        <Route path="/" element={<Explorer appData={appData} />} />
        <Route path="/login" element={<Login appData={appData} />} />
        <Route path="/ipfs" element={<IpfsStatus appData={appData} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
