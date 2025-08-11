


import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'


type State = {
  invitedUsers: any[];
};

const initialState: State = {
  invitedUsers: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setInvitedUsers(state, action: PayloadAction<any[]>) {
      state.invitedUsers = action.payload;
    },
  }
});

export const { setInvitedUsers } = userSlice.actions;
export default userSlice.reducer;
