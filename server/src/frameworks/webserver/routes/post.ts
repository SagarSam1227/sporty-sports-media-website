import express from "express"
import postController from "../../../adapters/controllers/postController";
import { postDbRepository } from "../../../application/repositories/postDbRepository";
import { postRepository } from "../../database/mongoDB/repositories/postRepository";
import uploadsMulter from "../middlewares/multer";

const postRouter = ()=>{

    const router = express.Router()

    const controller = postController(postDbRepository,postRepository)

    router.get('/',controller.getPost)
    router.post('/upload',uploadsMulter,controller.uploadPost)

    return router;

}

export default postRouter;