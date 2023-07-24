import { Schema,model } from "mongoose";

const userSchema = new Schema(
    {
        username:{
            type:String,
            // required:[true,"please add username"]
        },
        email:{
            type:String,
            // required:[true,"please add email"]
        },
        password:{
            type:String,
        },
        contact:{
            type:String,
        }
    }
)

const User = model("User",userSchema,"users")

export default User;