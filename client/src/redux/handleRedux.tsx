import {  addFollowing, addPost, addToFavorites, removeFollowing, removeFromFavorites, removePost, setUser } from "./Slices/userSlice"



export const handleItem = (email: string, username: string,image:string | null,postDetails:object[],followers:string[],following:string[],blocked:boolean,favorites:string[],dispatch:any)=> {
  dispatch(setUser({
    email: email, username: username, image: image, posts: postDetails,following:following,followers: followers,blocked:blocked,
    favorites: favorites
  }))
}

export const handleAddFollowing = (follower:string,dispatch:any)=>{
  console.log('addd');
  dispatch(addFollowing({follower:follower}))
}


export const handleRemoveFollowing = (follower:string,dispatch:any)=>{
  console.log('removee');
  
  dispatch(removeFollowing({follower:follower}))
}

export const handleAddToFavorites = (image:string,dispatch:any)=>{
  console.log('favorites added');
  dispatch(addToFavorites({image:image}))
}

export const handleRemoveFromFavorites = (image:string,dispatch:any)=>{
  console.log('favorites removed',image);
  dispatch(removeFromFavorites({image:image}))
}


export const handleDeletePost = (image:string,dispatch:any)=>{
  dispatch(removePost({post:image}))
}

export const handleAddPost = (post:{image:string},dispatch:any)=>{
  dispatch(addPost({post:post}))
}