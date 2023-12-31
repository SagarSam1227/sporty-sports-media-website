import { postRepository } from "../../frameworks/database/mongoDB/repositories/postRepository";
import { commentInterface, likesInterface } from "../../types/postInterface";

export const postDbRepository = (repository:ReturnType<postRepository>) => {

    const uploadPost = async (image:string,id:string) => await repository.addPost(image,id)

    const fetchPost = async () => await repository.findAllPost()

    const fetchRemainingPost = async (image:string) => await repository.findRestPost(image)

    const updateLikes = async (data:likesInterface) => await repository.editLikes(data)

    const fetchComments = async (post:string)=> await repository.findComments(post)

    const addComments = async (data:commentInterface)=> await repository.updateComments(data)

    const createCommentBox = async (data:String)=> await repository.createCommentBox(data)

    const addToReport = async (reason:string,image:string,user:string)=> await repository.updateReport(reason,image,user)

    const fetchOnePost = async (image:string)=> await repository.findOnePost(image)

    const updatePostBlock = async (hide:boolean,image:string)=> await repository.updateBlock(hide,image)




    return {
        uploadPost,
        fetchPost,
        fetchRemainingPost,
        updateLikes,
        fetchComments,
        addComments,
        createCommentBox,
        addToReport,
        fetchOnePost,
        updatePostBlock
    }
}

export type postDbInterface = typeof postDbRepository;

