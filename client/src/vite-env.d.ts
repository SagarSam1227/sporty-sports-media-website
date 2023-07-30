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
    isSignupPage:boolean;
    setIsSignupPage:React.Dispatch<React.SetStateAction<boolean>>;
}


export interface userResponse{
<<<<<<< Updated upstream
  data : {
     username:string 
     email:string
  }
=======
  ioken:string
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
>>>>>>> Stashed changes
}