import { createSlice } from '@reduxjs/toolkit';

const initialState: { is: boolean } = { is: true };
export const userSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.is = action.payload;
    },
  },
});
const { actions, reducer } = userSlice;
export default reducer;
export const { setLoading } = actions;
