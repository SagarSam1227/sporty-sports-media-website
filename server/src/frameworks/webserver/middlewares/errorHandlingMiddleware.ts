import { NextFunction, Request, Response } from "express";
import { CustomErr } from "../errors/custom-error";

export default function errorHandlingMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  // err.statusCode = err.statusCode || 500; // Default to 500 Internal Server Error if statusCode is not provided
  // const errorMessage = err.customMessage || err.message || "Something went wrong";
  //   console.log('erorrr isss.....',err);
  // return res.status(err.statusCode).json({
  //   status: err.statusCode,
  //   message: errorMessage
  // });

  if(err instanceof CustomErr){
    return res.status(err.statusCode).send({errors:err.serializeError()})
  }

  res.status(400).send({error:[{message:'somthing went wrong'}]})

}