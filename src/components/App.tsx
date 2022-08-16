import React from 'react';
import Main from './Main/Main';
import './App.css';
import Header from './Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCheckingAuth from '../hooks/useCheckingAuth';

function App() {
  useCheckingAuth();
  return (
    <div className="App">
      <Header />
      <Main />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
