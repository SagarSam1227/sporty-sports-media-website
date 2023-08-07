const addPost = (fileName:string,id:string,repository:any)=>{
    return repository.uploadPost(fileName,id);
}


export default addPost;