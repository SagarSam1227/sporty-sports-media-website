import { Schema,model } from "mongoose";


const commentSchema = new Schema(
    {
       image:{
        type:String
       },
       comments:[
        {
            username:{
                type:String
            },
           userProfile: {
            type:String
            },
            comment:{
                type:String
            },
            replies:Array,
            date:{
                type:Date,
                default:Date.now()
            }
        }
       ]
    }
)

const Comment = model("comment",commentSchema,"Comments")

export default Comment;