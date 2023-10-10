import { Schema, model } from "mongoose";

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        content: {
            type: String
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'chat'
        },
        createdAt: {
            type: Date,
            default: Date.now,

        }
    }
)

const Message = model('message', messageSchema)

export default Message;