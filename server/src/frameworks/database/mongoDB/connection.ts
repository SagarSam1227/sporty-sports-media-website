import mongoose from "mongoose";
import configKeys from "../../../config";
import { DatabaseConnectionErr } from "../../webserver/errors/databaseConnectionErr";

const connectDB:Function= async ()=>{
const MONGO_URL:string =configKeys.MONGO_DB_URL
    try{
        await mongoose.connect(MONGO_URL)
        console.log(`Database connected successfully ✅`);
    }catch (error){
        throw new DatabaseConnectionErr()
    }
}

export default connectDB;