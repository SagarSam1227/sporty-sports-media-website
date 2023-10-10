import { NextFunction, response } from "express";
import { Request, Response } from "express";
import { postDbInterface } from "../../application/repositories/postDbRepository";
import { postRepository } from "../../frameworks/database/mongoDB/repositories/postRepository";
import addPost from "../../application/useCases/post/addPost";
import fetchPost from "../../application/useCases/post/fetchPost";
import fetchRemainingPost from "../../application/useCases/post/fetchRemainingPost";
import updateLikes from "../../application/useCases/post/updateLikes";
import fetchComments from "../../application/useCases/post/getComments";
import postComments from "../../application/useCases/post/addComment";
import createComment from "../../application/useCases/post/createComment";
import asyncHandler from "express-async-handler";
import addToReport from "../../application/useCases/post/addReport";
import fetchSinglePost from "../../application/useCases/post/fetchSinglePost";


const postController = (
  postDbRepositoryInterface: postDbInterface,
  postDbReposImp: postRepository) => {
  const repository = postDbRepositoryInterface(postDbReposImp())

  const uploadPost = async (req: Request, res: Response, next: NextFunction) => {
    const { filename } = req?.file || {}
    const { id } = req?.payload?.user

    if (filename) {
      await createComment(repository, filename)
      addPost(filename, id, repository).then((response: object) => {
        res.json(response)
      }).catch((error: any) => {
        next(error)
      })
    }
  }

  const getPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await fetchPost(repository).then((response: any) => {
      res.json(response)
    }).catch((error: any) => {
      next(error)
    })
  })

  const getRemainingPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query, 'hahahahhahahahah');

    const image: any = req.query?.image
    await fetchRemainingPost(repository, image).then((response: any) => {
      res.json(response)
    }).catch((error: any) => {
      next(error)
    })
  })

  const updateLike = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body);

    await updateLikes(repository, req.body).then((response: object) => {
      console.log(response, 'this is response');
      res.json(response)
    }).catch((error: any) => {
      next(error)
    })
  })


  const getComments = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const post: any = req.query?.post
    console.log(post, 'postsssssssaaa');

    await fetchComments(repository, post).then((response: object) => {
      res.json(response)
    }).catch((error: any) => {
      next(error)
    })
  })


  const addComments = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body

    await postComments(repository, data).then((response: object) => {
      res.json(response)
    }).catch((error: any) => {
      next(error)
    })
  })

  const reportPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { reason, image, user } = req.body
    console.log(user, 'userrrrr');

    await addToReport(reason, image, user, repository).then((response: object) => {
      res.json(response)
    }).catch((error: any) => {
      next(error)
    })
  })

  const getSinglePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const image: any = req.query?.image
    console.log(image, 'postsssssssaaa');

    await fetchSinglePost(repository, image).then((response: object) => {
      res.json(response)
    }).catch((error: any) => {
      next(error)
    })
  })

  return {
    uploadPost,
    getPost,
    getRemainingPost,
    updateLike,
    getComments,
    addComments,
    reportPost,
    getSinglePost
  }

}


export default postController;