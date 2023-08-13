import express from "express"
import postController from "../../../adapters/controllers/postController";
import { postDbRepository } from "../../../application/repositories/postDbRepository";
import { postRepository } from "../../database/mongoDB/repositories/postRepository";
import uploadsMulter from "../middlewares/multer";
import userAuthMiddleware from "../middlewares/userAuthMiddleware";

const postRouter = ()=>{

    const router = express.Router()

    const controller = postController(postDbRepository,postRepository)

    router.get('/',controller.getPost)
    router.post('/upload',userAuthMiddleware,uploadsMulter,controller.uploadPost)

    return router;

}

export default postRouter;