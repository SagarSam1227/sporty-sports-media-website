function base64URLtoFile(base64URL: string, fileName: string) {
 
  console.log(base64URL,'url....');
  
    const base64String = base64URL.split(",")[1]; // Remove the data:image/png;base64, part
    const binaryString = atob(base64String); // Decode the base64 string into a binary string
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
  
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i); // Convert each character to a byte
    }
  
    // Create a Blob from the binary data
    const blob = new Blob([bytes], { type: "application/octet-stream" });
  
    // Create a File from the Blob
    return new File([blob], fileName, { type: "application/octet-stream" });
  }
  


  export default base64URLtoFile;