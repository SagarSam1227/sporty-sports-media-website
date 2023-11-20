import React from "react";


export interface RootState {
  user:object[]
  currentChat:object[]
  // Add other slices and their respective states here
}

// for userSlice
export interface User {
  username: string | null,
  email:string | null,
  image?:string |null,
  profile_picture?:string | null,
  posts:{image:string}[] | null,
  followers:string[] | null,
  following:string[] | null,
  blocked:boolean | null,
  favorites:string[] | null,
}


export interface LoginProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignupPage?:boolean;
  setIsSignupPage?:React.Dispatch<React.SetStateAction<boolean>>;
}


export interface userResponse{
token:string
data:object
}


export interface UserNotFoundProps {
message1:string,
message2:string,
onUserDismiss:()=>void
}


export interface formikInitialValues {
username:string,
email:string,
password:string,
contact:string
}


export interface darkmodeInterface {
  isDarkmode:boolean,
  setIsDarkmode:(value:boolean)=>void
}

export interface MyDataType {
  image: string,
  userDetails:{any},
  hide:boolean
  // other properties if present
}


interface ImportMetaEnv {
  VITE_AUTH_URL: string;
  // Define other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface card{
  likes: Array,
  image:string,
  _id:string,
  userDetails:{
    username:string,
    profile_picture:string
  }
}

export interface likesInterface{
  likes:string[]
  setIsLikeList:React.Dispatch<React.SetStateAction<boolean>>
}

export interface reportInterface{
  reports:{
    email:string,
    reason:string
  }[]
  setIsViewReport:React.Dispatch<React.SetStateAction<boolean>>
}


export interface optionsInterface{
  email:string,
  card:{
      image: string;
},
setIsOptionsSelected:React.Dispatch<React.SetStateAction<boolean>>,
handleSave:()=>{}


}


export interface myOptionsInterface{
  card:{
      image: string;
},
setIsOptionsSelected:React.Dispatch<React.SetStateAction<boolean>>,
setIsFullImage:React.Dispatch<React.SetStateAction<boolean>>,



}


export interface chatInterface{
  members: {membersId:{
    profile_picture:string,
    username:string,
    _id:String
  }}[]
  latestMessage:{
    createdAt: Date;
    content:string
  }
  createdAt:Date;
}