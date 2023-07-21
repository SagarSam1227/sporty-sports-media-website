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
}
