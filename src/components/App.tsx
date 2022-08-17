import React from 'react';
import Main from './Main/Main';
import './App.css';
import Header from './Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from 'mobx-react-lite';
import user from '../store/user/user';

const App = observer(() => {
  user.checkingUser();
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
});

export default App;
