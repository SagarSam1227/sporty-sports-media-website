import dotenv from 'dotenv'
dotenv.config()

const configKeys = {
    
    MONGO_DB_URL : process.env.DATABASE as string,
    PORT : process.env.PORT as string
}


export default configKeys;