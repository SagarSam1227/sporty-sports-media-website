import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'


const options:any = {
  cloudinary: cloudinary,
  params: {
    folder:(req:any,file:any)=>{
      if(req.path==='/upload-profile'){
        return 'Profile'
      }else{
        console.log('postssssssss');
        console.log(req.path);
        
        return 'Posts'
      }
    },
    allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
    public_id: (req:Request, file:any) => {
      console.log(file, 'fileisssss');
      const originalname = file.originalname.split('.')
      return `image-${Date.now()}-${originalname[0]}`
    }
  }
}

const store = new CloudinaryStorage(options)

const uploadsMulter = multer({ storage: store }).single("image");

export default uploadsMulter;
