import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../../pages/SignIn/SignIn';
import SignUp from '../../pages/SignUp/SignUp';
import Welcome from '../../pages/Welcome/Welcome';
import UserProfile from '../../pages/UserProfile/UserProfile';
import Plans from '../../pages/Plans/Plans';
import user from '../../store/user/user';
import { observer } from 'mobx-react-lite';

const Main = observer(() => {
  return (
    <main>
      <Routes>
        <Route>
          {user.email ? (
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
});
export default Main;
