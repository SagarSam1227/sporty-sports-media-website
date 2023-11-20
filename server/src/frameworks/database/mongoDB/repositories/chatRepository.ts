
import { GetErr } from "../../../webserver/errors/getErr";
import { PostErr } from "../../../webserver/errors/postErr";
import Chat from "../models/chatModel";
import Message from "../models/messageModel";

export const chatRepository = () => {

    const chatAccess = async (senderId: String, recieverId: String) => {

        try {
            const query = [senderId, recieverId]

            // const response = {senderId,recieverId}

            // const response = await Chat.findOne({isGroupChat:false},{$and:[,{members:{$elemMatch:{$eq:senderId}}},{members:{$elemMatch:{$eq:recieverId}}}]})

            const response = await Chat.findOne({ 'members.membersId': { $all: query } })
            console.log(response, 'response');


            if (response) {


                const result = await Chat.findOne({ _id: response._id }).populate('members.membersId').populate('latestMessage.messageId').exec()

                console.log(4444444, result);

                console.log(111111111, result?.members[0].membersId);


                return result



            } else {
                const data = {
                    chatName: recieverId,
                    isGroupChat: false,
                    members: [{ membersId: senderId }, { membersId: recieverId }]
                }
                const createdChat = await Chat.create(data)
                const result =await createdChat.populate('members.membersId')
                console.log(result,'created chat');
                
                return createdChat

            }


        } catch (error) {
            throw new PostErr('Failed to create chat')
        }
    }

    const getChat = async (id: string) => {
        try {

            const query = [id]
const response = await Chat.find({ 'members.membersId': { $all: query } }).sort({'createdAt': -1})
  .populate('members.membersId', '-password')
  .populate('latestMessage')
   // Sort in ascending order
  .exec();
           
            console.log(response,'1234567890');
            if (response) {

                return response
            }

        } catch (error) {
            throw new GetErr('Failed to get chat')
        }
    }

    const postNewMessage = async (senderId: String, chat: string, message: string) => {
        try {
            const newMessage = new Message({
                sender: senderId,
                content: message,
                chat: chat
            });
            await newMessage.save();
            console.log(newMessage, 'new messageeeeeeee saved');

            const chatDoc = await Chat.findOne({ _id: chat })

            if (chatDoc) {
                chatDoc.latestMessage = newMessage?._id

                await chatDoc.save()
            }

            await (await newMessage.populate('sender')).populate('chat')
            return newMessage;


        } catch (error) {
            throw new PostErr('Failed to create message')
        }
    }

    const getAllMessages = async (chat: string) => {
        try {

            console.log(1010);

            const response = await Message.find({ 'chat': chat }).populate('sender', '-password').populate('chat').exec()
            console.log(response, 'response.......1111111');
            if (response) {

                return response
            }

        } catch (error) {
            console.log(error);

            throw new GetErr('Failed to get chat')
        }
    }


    return {
        chatAccess,
        getChat,
        postNewMessage,
        getAllMessages
    }

}


export type chatRepository = typeof chatRepository;