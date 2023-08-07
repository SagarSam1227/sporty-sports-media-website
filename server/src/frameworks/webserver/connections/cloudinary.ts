import {v2 as cloudinary} from 'cloudinary';
import configKeys from '../../../config';


const cloudinaryConfig = ()=>{
    cloudinary.config({
        cloud_name:configKeys.CLOUD_NAME,
        api_key:configKeys.API_KEY,
        api_secret:configKeys.API_SECRET
    })
}

export default cloudinaryConfig;