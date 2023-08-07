// import User from "../models/userModel";
import Post from "../models/postModel"

export const postRepository = () => {
    const addPost = async (image: string, id: string) => {
        const newPost = new Post({
            userid: id,
            image: image
        })

        return newPost.save();

    }

    const findAllPost = async ()=>{
        const response = await Post.find({"private":false}).sort({ createdAt: -1 })
        if(response){
            return response
        }
        return false
    }

    return {
        addPost,
        findAllPost
    }

}


export type postRepository = typeof postRepository;