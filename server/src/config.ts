import dotenv from 'dotenv'
dotenv.config()

const configKeys = {
    
    MONGO_DB_URL : process.env.DATABASE as string,
    PORT : process.env.PORT as string,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY as string,
    CLOUD_NAME: process.env.CLOUD_NAME as string,
    API_KEY:process.env.API_KEY as string,
    API_SECRET:process.env.API_SECRET as string

}


export default configKeys;