import React, { useEffect } from 'react';
import Main from './Main/Main';
import './App.css';
import Header from './Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { login } from '../store/user/userSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAuth().onAuthStateChanged(result => {
      console.log(result);
      dispatch(
        login({
          name: result?.displayName,
          email: result?.email,
          uid: result?.uid,
        }),
      );
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Main />
      <footer />
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
