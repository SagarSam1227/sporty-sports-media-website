import {authService} from "../../services/authServices"
import {Request,Response,NextFunction} from "express"

// Middleware function for JWT token authentication
const userAuthMiddleware = (req:Request, res:Response, next:NextFunction) => {
    let token:string | null='';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      console.log('request is .....',req);
      console.log('end of req....');
      token = req.headers.authorization.split(' ')[1];
    }

  if (!token) {
    console.log('authentication required....................................................');
    return res.status(401).json({ message: 'Authentication required' });
    
  }

  try{
    console.log('verification started....',token);
    const {payload}:any=authService().verifyToken(token)
    console.log('this is payload......',payload,393939393939939);
    if(payload){
      req.body.id = payload
      next()
    }else{
      new Error('Invalid token');
    }
  }catch(err){
    return res.status(403).json({ message: 'Invalid token' });
  }
};


export default userAuthMiddleware