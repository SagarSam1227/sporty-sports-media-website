
import { GetErr } from "../../../webserver/errors/getErr";
import { PostErr } from "../../../webserver/errors/postErr";
import Chat from "../models/chatModel";

export const chatRepository = () => {

    const chatAccess = async (senderId: String, recieverId: String) => {

        try {
            const query = [senderId, recieverId]

            // const response = {senderId,recieverId}

            // const response = await Chat.findOne({isGroupChat:false},{$and:[,{members:{$elemMatch:{$eq:senderId}}},{members:{$elemMatch:{$eq:recieverId}}}]})

            const response = await Chat.findOne({ 'members.membersId': { $all: query } })
            console.log(response, 'response');

 
            if (response) {


                const result =await Chat.findOne({ _id: response._id }).populate('members.membersId').populate('latestMessage.messageId').exec()

                console.log(4444444,result);

                console.log(111111111,result?.members[0].membersId);
                
                
                return result


 
            } else {
                const data = {
                    chatName: recieverId,
                    isGroupChat: false,
                    members: [{ membersId: senderId }, { membersId: recieverId }]
                }
                await Chat.create(data)
                return data


            }


        } catch (error) {
            throw new PostErr('Failed to create chat')
        }
    }

    const getChat = async (id:string)=>{
        try{

            const query = [id]
            const response = await Chat.find({'members.membersId': { $all: query } }).populate('members.membersId','-password').populate('latestMessage.messageId').exec()
            console.log(response);
            if(response){

                return response
            }

        }catch(error){
            throw new GetErr('Failed to get chat')
        }
    }
    

    return {
        chatAccess,
        getChat
    }

}


export type chatRepository = typeof chatRepository;