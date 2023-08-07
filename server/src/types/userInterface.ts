import {userDbInterface} from "../application/repositories/userDbRepository"
import {authServiceInterfaceType} from "../application/services/authServiceInterface"
import { Request } from "express";

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



declare global {
    namespace Express {
      interface Request {
        payload:{
            user:{id:string}
        }; // Replace 'string' with the appropriate type for your new field
      }
    }
  }