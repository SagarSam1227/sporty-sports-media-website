// // This utility function should be placed in a separate file, e.g., getCroppedImg.ts

// import { createWorker } from "tesseract.js"; // You may need to install this package

// export default async function getCroppedImg(imageSrc: any, pixelCrop: any) {
//   const canvas = document.createElement("canvas");
//   const scaleX = imageSrc?.width / imageSrc?.naturalWidth;
//   const scaleY = imageSrc?.height / imageSrc?.naturalHeight;
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;
//   const ctx = canvas.getContext("2d");

//   console.log(scaleX,scaleY,canvas);
  

//   if (ctx) {
//     ctx.drawImage(
//       imageSrc,
//       pixelCrop.x * scaleX,
//       pixelCrop.y * scaleY,
//       pixelCrop.width * scaleX,
//       pixelCrop.height * scaleY,
//       0,
//       0,
//       pixelCrop.width,
//       pixelCrop.height
//     );
//         console.log(ctx);
        
//     return new Promise<string>(async(resolve) => {
//      canvas.toBlob((blob) => {
//             if (!blob) {
//                 console.error("Canvas is empty");
//                 return;
//             }
//             const reader = new FileReader();
//             reader.readAsDataURL(blob);
//             reader.onloadend = () => {
//                 const base64data = reader.result as string;
//                 resolve(base64data);
//             };
//         }, "image/jpg");
//     });
//   }

//   throw new Error("Canvas context is null");
// }



export default async function getCroppedImg(imageSrc: string, pixelCrop: { width: number; height: number; x: number; y: number; }) {
  console.log('sagar oru myran: ',imageSrc,' : ',typeof(imageSrc),'  *  ',pixelCrop,typeof(pixelCrop));
  
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // const scaleX = img.width / img.naturalWidth;
        // const scaleY = img.height / img.naturalHeight;
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
  
        if (ctx) {
          ctx.drawImage(
            img,
            pixelCrop.x ,
            pixelCrop.y ,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
          );
  
          canvas.toBlob((blob) => {
            if (!blob) {
              console.error('Canvas is empty');
              reject(new Error('Canvas is empty'));
              return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64data = reader.result as string;
              resolve(base64data);
            };
          }, 'image/jpeg');
        } else {
          reject(new Error('Canvas context is null'));
        }
      };
  
      img.onerror = (error) => {
        reject(error);
      };
    });
  }
  