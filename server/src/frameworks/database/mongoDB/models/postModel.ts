import { Schema,model } from "mongoose";


const postSchema = new Schema(
    {
        userid:{
            type:String,
        },
        image:{
            type:String
        },
        private:{
            type:Boolean,
            default:false
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        likes:{
            type:Array
        },
        reports:{
            type:Array
        },
        hide:{
            type:Boolean,
            default:false
        }
    }
)

const Post = model("post",postSchema,"posts")

export default Post;