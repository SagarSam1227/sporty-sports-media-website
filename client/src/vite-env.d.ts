

export interface RootState {
  user:object[]
  // Add other slices and their respective states here
}

// for userSlice
export interface User {
  username: string | null,
  email:string | null
}


export interface LoginProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignupPage?:boolean;
  setIsSignupPage:React.Dispatch<React.SetStateAction<boolean>>;
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
  image: string;
  // other properties if present
}


interface ImportMetaEnv {
  VITE_AUTH_URL: string;
  // Define other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}