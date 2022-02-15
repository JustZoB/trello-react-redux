import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
  },
  reducers: {
    userNameSet(state, action) {
      state.userName = action.payload.userName
    }
  }
});

export const { userNameSet } = userSlice.actions;

export default userSlice.reducer;
