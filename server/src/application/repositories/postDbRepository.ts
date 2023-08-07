import { postRepository } from "../../frameworks/database/mongoDB/repositories/postRepository";

export const postDbRepository = (repository:ReturnType<postRepository>) => {

    const uploadPost = async (image:string,id:string) => await repository.addPost(image,id)

    const fetchPost = async () => await repository.findAllPost()

    return {
        uploadPost,
        fetchPost
    }
}

export type postDbInterface = typeof postDbRepository;

