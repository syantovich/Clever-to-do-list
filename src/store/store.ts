import { configureStore } from '@reduxjs/toolkit';
import user from './user/userSlice';
import isLoading from './isLoading/isLoadingSlice';
import plans from './plans/plansSlice';
import workMode from './workMode/workModeSlice';

const store = configureStore({
  reducer: { user, isLoading, plans, workMode },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE !== 'production',
});
export default store;
