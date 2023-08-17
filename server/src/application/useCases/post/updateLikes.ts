import {likesInterface} from "../../../types/postInterface"

const updateLikes=(repository:any,data:likesInterface)=>{
    return repository.updateLikes(data);
}

export default updateLikes;