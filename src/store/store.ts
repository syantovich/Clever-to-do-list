import { configureStore } from '@reduxjs/toolkit';
import user from './user/userSlice';

const store = configureStore({
  reducer: { user },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE !== 'production',
});
export default store;
