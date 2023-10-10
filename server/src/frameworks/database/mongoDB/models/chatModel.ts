import { Schema, model } from "mongoose";

const chatSchema = new Schema(
    {
        chatName: {
            type: String
        },
        isGroupChat: {
            type: Boolean
        },
        members: [
            {
                membersId:
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            }


        ],
        latestMessage: {
            messageId: {
                type: Schema.Types.ObjectId,
                ref: 'message'
            }
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    })

const Chat = model("chat", chatSchema)

export default Chat;