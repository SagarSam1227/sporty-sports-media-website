import bcrypt from 'bcryptjs'
import jwt, { decode } from 'jsonwebtoken'
import configKeys from '../../config';

export const authService=()=>{
    const encryptPassword=async(password:string)=>{
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password
    }

    const comparePassword = (password: string, hashedPassword: string) => {
        // Check if the password and hashedPassword are defined and non-empty strings
        console.log(password,'passssssworddddddddd');
        console.log(hashedPassword,'hasheedddddd');
        
        
        if (!password || typeof password !== 'string' || !hashedPassword || typeof hashedPassword !== 'string') {
          throw new Error('Invalid arguments: password and hashedPassword must be non-empty strings.');
        }
      
        return bcrypt.compare(password, hashedPassword);
      };

    const generateToken=(payload:string)=>{
        const token = jwt.sign({payload}, configKeys.JWT_SECRET_KEY, {
            expiresIn: "5d",
        });
        return token
    }

    const verifyToken=(token:string)=>{
        return jwt.verify(token, configKeys.JWT_SECRET_KEY)
        
        
    }

    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken
    }
}


export type AuthService = typeof authService

export type AuthServiceReturn = ReturnType<AuthService>