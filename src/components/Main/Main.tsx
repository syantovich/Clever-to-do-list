import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from '../../pages/SignIn/SignIn';
import SignUp from '../../pages/SignUp/SignUp';
import Welcome from '../../pages/Welcome/Welcome';
import { userSelector } from '../../store/user/selector';
import UserProfile from '../../pages/UserProfile/UserProfile';
import Plans from '../../pages/Plans/Plans';

const Main = () => {
  const { name } = useSelector(userSelector);
  return (
    <main>
      <Routes>
        <Route>
          {!name && (
            <>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </>
          )}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="plans" element={<Plans />} />
          <Route path="/" element={<Welcome />} />
        </Route>
      </Routes>
    </main>
  );
};
export default Main;
