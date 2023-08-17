import { commentInterface } from "../../../types/postInterface";

const createComment=(repository:any,post:String)=>{
    return repository.createCommentBox(post);
}

export default createComment;