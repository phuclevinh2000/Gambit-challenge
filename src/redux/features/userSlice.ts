import { createSlice } from '@reduxjs/toolkit';

const user =
  JSON.parse(localStorage.getItem('user') || '{}') === '{}'
    ? null
    : JSON.parse(localStorage.getItem('user')!);

const initialState = {
  user: user,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;

      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;

      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
