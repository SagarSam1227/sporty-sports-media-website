const profileUpdate =(id: string, username: string |undefined, image: string | undefined,repository:any)=>{
    return repository.profileUpdate(id,username,image,repository)
}

export default profileUpdate;