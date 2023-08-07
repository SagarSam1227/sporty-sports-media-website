
const dataURLToBlob = (dataUrl:string) => {
    const arr:Array<any> = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };
  const convertToTraditionalUrl = (dataUrl: string) => {
    const blob = dataURLToBlob(dataUrl);
    const traditionalUrl = URL.createObjectURL(blob);
    console.log(traditionalUrl);
    URL.revokeObjectURL(traditionalUrl); // Clean up
    return traditionalUrl

}

export default convertToTraditionalUrl;
