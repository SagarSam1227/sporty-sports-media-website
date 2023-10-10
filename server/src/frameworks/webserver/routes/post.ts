import express from "express"
import postController from "../../../adapters/controllers/postController";
import { postDbRepository } from "../../../application/repositories/postDbRepository";
import { postRepository } from "../../database/mongoDB/repositories/postRepository";
import userAuthMiddleware from "../middlewares/userAuthMiddleware";
import uploadsMulter from "../middlewares/multer";

const postRouter = ()=>{

    const router = express.Router()

    const controller = postController(postDbRepository,postRepository)

    router.get('/',controller.getPost)
    router.get('/rest-posts',userAuthMiddleware,controller.getRemainingPost)
    router.post('/upload',userAuthMiddleware,uploadsMulter,controller.uploadPost)
    router.post('/update-like',userAuthMiddleware,controller.updateLike)
    router.get('/comment',userAuthMiddleware,controller.getComments)
    router.post('/comment',userAuthMiddleware,controller.addComments)
    router.post('/report-post',userAuthMiddleware,controller.reportPost)
    router.get('/get-single-post',userAuthMiddleware,controller.getSinglePost)
    router.get('')

    return router;

}

export default postRouter;