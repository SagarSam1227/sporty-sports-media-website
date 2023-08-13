import { SetStateAction } from "react";
import { handleItem } from "../utils/handleRedux";
import { MyDataType } from "../vite-env";
import baseURL from "./axiostInterceptor";
import axios from "axios";
import { GETPOST_URL, LOGIN_URL } from "./URLs";


export const authUrl = async (dispatch: any) => {
    await baseURL
        .get('check-auth')
        .then((response: { data: { email: any; username: any } }) => {
            if (
                response &&
                response.data &&
                response.data.email &&
                response.data.username
            ) {
                const { email, username } = response.data; // Destructure email and username from the response data
                handleItem(email, username, dispatch)
            }
            return 'okk daaa'
        })
        .catch((err) => {
            console.log(err);
        });

}


export const postUrl = async (setData: { (value: SetStateAction<MyDataType[]>): void; (arg0: any): void; }) => {
    axios
        .get(GETPOST_URL)
        .then((response) => {
            console.log(response);
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}


export const uploadUrl = async (inputFile: File, navigate: (arg0: string, arg1: { state: any; }) => void) => {
    const formData = new FormData();
    formData.append("image", inputFile);

    console.log(formData,'formmmmdataaa');
    
    const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };

    baseURL
        .post("post/upload", formData, config)
        .then((response) => {
            if (response.data) {
                navigate("/singlepost", { state: response.data });
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
                localStorage.setItem("authToken", response.data.token);
                console.log(response.data.user);
                handleItem(response.data?.user?.email,
                    response.data?.user?.username, dispatch)
                setIsUserNotExist(false);
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


export const newsUrl = async (setData: (arg0: any) => void)=>{
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
        
      }).catch((err)=>{
        console.log(err);
        
      })
}