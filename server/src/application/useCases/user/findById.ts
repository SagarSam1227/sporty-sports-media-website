const findById=(id:string,repository:any)=>{
    return repository.getUserById(id)
}

export default findById;