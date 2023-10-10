async function urlToBase64(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          if (reader.result && typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert image to Base64.'));
          }
        };
      });
    } catch (error) {
      throw new Error('Failed to fetch the image: ' + error.message);
    }
  }
  
  // Example usage:
  const imageUrl = 'https://res.cloudinary.com/dcs2ybdst/image/upload/Profile/image-1693741369899-2022-group-h-match-portugal-7790.jpg';
  
  urlToBase64(imageUrl)
    .then(base64Image => {
      console.log('Base64 Image:', base64Image);
      // Now you can use the base64Image as the source for an <img> tag or elsewhere.
    })
    .catch(error => {
      console.error('Error:', error);
    });
  

    export default urlToBase64;