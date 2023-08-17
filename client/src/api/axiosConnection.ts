import { Dispatch, SetStateAction } from "react";
import { handleItem } from "../utils/handleRedux";
import { MyDataType } from "../vite-env";
import baseURL from "./axiostInterceptor";
import axios from "axios";
import { GETPOST_URL, LOGIN_URL,GET_PROFILE_URL } from "./URLs";
import { strict } from "assert";


export const authUrl = async (dispatch: any) => {
    await baseURL
        .get('check-auth')
        .then((response: { data: { email: string; username: string; profile_picture: string | null } }) => {
            if (
                response &&
                response.data &&
                response.data.email &&
                response.data.username ||
                response.data.profile_picture
            ) {
                const { email, username, profile_picture } = response.data; // Destructure email and username from the response data
                handleItem(email, username, profile_picture, dispatch)
            }
            return 1
        })
        .catch((err) => {
            console.log(err);
        });

}


export const findProfileUrl = async (setData: (arg0: any) => void,userId:string)=>{

    const queryParams = {
        userId:userId
    };
  await axios
    .get("http://localhost:3000/api/user/get-profile", { params: queryParams })
    .then((response) => {
        console.log(response,'resultttttt');
        setData(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}


export const postUrl = async (setData: { (value: SetStateAction<MyDataType[]>): void; (arg0: any): void; }) => {
    axios
        .get(GETPOST_URL)
        .then((response) => {
            console.log(response,'ressssssss');
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const remainingPostUrl = async (setData: { (value: SetStateAction<MyDataType[]>): void; (arg0: any): void; }, image: string) => {
    const queryParams = {
        image: image
    };

    console.log('queryParams', queryParams);
    
    axios
        .get("http://localhost:3000/api/post/rest-posts", { params: queryParams })
        .then((response) => {
            console.log('response', response);
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}


export const uploadUrl = async (inputFile: File, navigate: (arg0: string, arg1: { state: any; }) => void) => {
    const formData = new FormData();
    formData.append("image", inputFile);
    console.log('fileeessss', inputFile);


    console.log(formData, 'formmmmdataaa');

    const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };

    baseURL
        .post("post/upload", formData, config)
        .then((response) => {
            if (response.data) {
                console.log(response.data,'5555555555555555');
                
                navigate("/singlepost", { state: response.data });
            }
        })
        .catch((err) => {
            console.log("errrorrrr!!!");

            console.log(err);
        });
}


export const uploadProfileUrl = async (inputFile: File | null | string | undefined, userName: string | null, navigate: (arg0: string, arg1: { state: any; }) => void) => {
    const formData = new FormData();
    console.log(inputFile);

    if (inputFile) {
        if (inputFile === 'removed') {
            formData.append("imageUrl", inputFile)
        } else {

            formData.append("image", inputFile);
        }
    }
    if (userName) {
        formData.append("username", userName)
    }

    console.log(formData);


    const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };

    baseURL
        .post("user/upload-profile", formData, config)
        .then((response) => {
            if (response) {
                console.log(response);

                navigate("/home", { state: null });
            }
        })
        .catch((err) => {
            console.log("errrorrrr!!!");

            console.log(err);
        });
}


export const loginUrl = async (
    password: String,
    email: String,
    dispatch: any,
    setIsUserNotExist: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },
    setUserLoginErr: { (value: SetStateAction<string | null>): void; (arg0: any): void; }) => {

    const LOGIN_API = LOGIN_URL;

    const data = {
        email: email,
        password: password,
    };

    axios
        .post(LOGIN_API, data)
        .then((response) => {
            console.log(response);
            if (response?.data?.token) {
                console.log('not erorrrrr');
                
                setIsUserNotExist(false);
                localStorage.setItem("authToken", response.data.token);
                console.log(response.data.user);
                handleItem(response.data?.user?.email,
                    response.data?.user?.username, response.data.User.profile_picture, dispatch)
            } else {
                console.log("errorrrr");

                setIsUserNotExist(true);
            }
        })
        .catch((error) => {
            setIsUserNotExist(true);
            setUserLoginErr(error.response.data.message);
            console.log("errrroorr isss", error);
        });
}


export const newsUrl = async (setData: (arg0: any) => void) => {
    axios
        .get(
            "https://newsapi.org/v2/everything?q=sports&from=2023-07-08&sortBy=publishedAt&apiKey=af934882ba5246bba19d9bad63a498d8"
        )
        .then((response) => {
            console.log(response.data.articles);
            const data = response.data.articles;
            setData(data);
            const content = data.content.string
            console.log(content);

        }).catch((err) => {
            console.log(err);

        })
}


export const updateLikeUrl = async (action:string,post:string,username:string)=>{

    const data = {
        action:action,
        username:username,
        image:post
    }

    baseURL.post('post/update-like',data).then((response)=>{
        console.log(response);
    }).catch((err)=>{
        console.log(err);
        
    })
}


export const getCommentUrl = async (post:string,setData: Dispatch<SetStateAction<{ username: String; userProfile: String; comment: String; date:Date }[]>>)=>{
    const queryParams ={
        post:post
    }

   await baseURL.get('post/comment',{params:queryParams}).then((response)=>{
        setData(response?.data?.comments.reverse())
    })
}

export const postCommentUrl = async(post:String,username:String,profile:String,comment:String)=>{


    const data = {
        post:post,
        username:username,
        profile:profile,
        comment:comment
    }

    await baseURL.post('post/comment',data).then((response)=>{
        return response
        
    })

}