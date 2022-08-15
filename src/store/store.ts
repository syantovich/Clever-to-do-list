import { configureStore } from '@reduxjs/toolkit';
import user from './user/userSlice';
import isLoading from './isLoading/isLoadingSlice';
import plans from './plans/plansSlice';
import workMode from './workMode/workModeSlice';
import switchGraph from './switchGraphs/switchGraphsSlice';

const store = configureStore({
  reducer: { user, isLoading, plans, workMode, switchGraph },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE !== 'production',
});
export default store;
