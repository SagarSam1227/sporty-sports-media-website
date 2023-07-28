const findByProperty=(key:string,value:string,repository:any)=>{
    return repository.getUserByProperty(key,value)
}

export default findByProperty;