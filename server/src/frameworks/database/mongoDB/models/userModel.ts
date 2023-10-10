import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            // required:[true,"please add username"]
        },
        email: {
            type: String,
            // required:[true,"please add email"]
        },
        password: {
            type: String,
        },
        profile_picture: {
            type: String,
            default: null
        },
        contact: {
            type: String,
        },
        following: {
            type: Array
        },
        followers: {
            type: Array
        },
        google: {
            type: Boolean,
            default: false
        },
        blocked: {
            type: Boolean,
            default: false
        },
        favorites: {
            type: Array
        }
    }
)

const User = model("User", userSchema, "users")

export default User;