import { NextFunction, Request, Response } from "express";

export default function errorHandlingMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  err.statusCode = err.statusCode || 500; // Default to 500 Internal Server Error if statusCode is not provided
  const errorMessage = err.customMessage || err.message || "Something went wrong";
    console.log('erorrr isss.....',err);
  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: errorMessage
  });
}