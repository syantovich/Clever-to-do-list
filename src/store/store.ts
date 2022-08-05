import { configureStore } from '@reduxjs/toolkit';
import user from './user/userSlice';
import isLoading from './isLoading/isLoadingSlice';

const store = configureStore({
  reducer: { user, isLoading },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE !== 'production',
});
export default store;
