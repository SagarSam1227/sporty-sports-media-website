import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../vite-env';


interface UserState {
  items: User;
}

const initialState: UserState = {
  items: {
      username: null,
      email: null,
      image:null,
      posts:null,
      followers:null,
      following:null,
      blocked:null,
      favorites:null,
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
      state.items.posts = action.payload.posts
      state.items.followers = action.payload.followers
      state.items.following = action.payload.following
      state.items.blocked = action.payload.blocked
      state.items.favorites = action.payload.favorites



    },
    clearUserDetails: (state) => {
      state.items = {
        username:null,
        email:null,
        image:null,
        posts:null,
        followers:null,
        following:null,
        blocked:null,
        favorites:null,

      };
    },
    addFollowing:(state,action:PayloadAction<{follower:string}>)=>{
      state.items.following?.push(action.payload.follower)
    },
    removeFollowing:(state,action:PayloadAction<{follower:string | null}>)=>{
      if (state.items?.following) {
        state.items.following = state.items.following.filter((element) => element !== action.payload.follower);
      }
    },
    addToFavorites:(state,action:PayloadAction<{image:string}>)=>{
      state.items.favorites?.push(action.payload.image)
    },
    removeFromFavorites:(state,action:PayloadAction<{image:string | null}>)=>{
      if (state.items?.favorites) {
        state.items.favorites = state.items.favorites.filter((element) => element !== action.payload.image);
      }
    },
    addPost:(state,action:PayloadAction<{post:{image:string}}>)=>{
      state.items.posts?.push(action.payload.post)
    },
  
    removePost:(state,action:PayloadAction<{post:string}>)=>{
      if(state?.items?.posts){
        state.items.posts= state.items.posts.filter((element)=>element.image!==action.payload.post)
      }
    }
  },
});

export const { setUser, clearUserDetails,addFollowing,removeFollowing,addToFavorites,removeFromFavorites,addPost,removePost} = userSlice.actions;
export default userSlice.reducer;
