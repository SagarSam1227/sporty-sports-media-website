import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import LogInButton from "./LoginButon";


function UserDetails(){

    const userInfo:any = useSelector<RootState>((store)=>store.user)



    if(userInfo.items.username){ 
        return (
            <>
            <UserProfile />
            </>
        )
    }else{
        return(
            <LogInButton />
        )
    }
    }


export default UserDetails;