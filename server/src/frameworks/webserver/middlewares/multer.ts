import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// const store = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },    
// });

const options:any = {
  cloudinary: cloudinary,
  params: {
    folder:'Posts',
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
