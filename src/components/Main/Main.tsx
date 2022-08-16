import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from '../../pages/SignIn/SignIn';
import SignUp from '../../pages/SignUp/SignUp';
import Welcome from '../../pages/Welcome/Welcome';
import { userSelector } from '../../store/user/selector';
import UserProfile from '../../pages/UserProfile/UserProfile';
import Plans from '../../pages/Plans/Plans';

const Main = () => {
  const { email } = useSelector(userSelector);
  console.log(email);
  return (
    <main>
      <Routes>
        <Route>
          {email ? (
            <>
              <Route path="plans" element={<Plans />} />
              <Route path="/profile" element={<UserProfile />} />
            </>
          ) : (
            <>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </>
          )}

          <Route path="/" element={<Welcome />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </main>
  );
};
export default Main;
