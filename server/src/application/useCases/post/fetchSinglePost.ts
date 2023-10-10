const fetchSinglePost=(repository:any,post:string)=>{
    return repository.fetchOnePost(post);
}

export default fetchSinglePost;