import { commentInterface } from "../../../types/postInterface";

const postComments=(repository:any,post:commentInterface)=>{
    return repository.addComments(post);
}

export default postComments;