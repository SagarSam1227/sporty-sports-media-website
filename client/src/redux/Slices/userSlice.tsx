import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../vite-env';


interface UserState {
  items: User;
}

const initialState: UserState = {
  items: {
      username: null,
      email: null,
      image:null
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.items.email=action.payload.email
      state.items.username=action.payload.username
      state.items.image = action.payload.image 
    },
    clearUserDetails: (state) => {
      state.items = {
        username:null,
        email:null,
        image:null
      };
    },
  },
});

export const { setUser, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
