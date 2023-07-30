import {userDbInterface} from "../application/repositories/userDbRepository"
import {authServiceInterfaceType} from "../application/services/authServiceInterface"

export interface userInterface{
    username?:string;
    email?:string;
    password?:string;
    contact?:string;
}


export interface userAuthInterface{
    email:string;
    password:string;
    userDbRepository:any;
    userAuthService:any;
}


export interface payloadInterface{
user:{
    id:string
}
}


export interface entityInterface{
    getUsername: () => void;
    getEmail: () => void;
    getPassword: () => void;
    getContact: () => void;
}