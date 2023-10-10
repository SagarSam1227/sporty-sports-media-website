import { SetStateAction } from "react";
import { handleAddPost, handleItem } from "../redux/handleRedux";
import { MyDataType, User, formikInitialValues } from "../vite-env";
import baseURL from "./axiostInterceptor";
import axios from "axios";
import { LOGIN_URL } from "../api/urls";
import { NavigateFunction } from "react-router-dom";
import { Dispatch, AnyAction } from "redux";


export const authUrl = async (dispatch: any) => {
    await baseURL
        .get('check-auth')
        .then((response: { data: [{ email: string; username: string; profile_picture: string | null, postDetails: [{hide:boolean}], following: string[], followers: string[], blocked: boolean,favorites:string[] }] }) => {
            console.log(response, 'result of check auth');

            if (
                response &&
                response.data &&
                response.data[0].email &&
                response.data[0].username ||
                response.data[0].profile_picture
            ) {
                const { email, username, profile_picture, postDetails, followers, following,favorites } = response.data[0];
                // Destructure email and username from the response data
                console.log(postDetails,'dd');

                
                interface PostDetails {

                    hide: boolean;
                    // Add other properties as needed
                  }
                  
                  const postArray: PostDetails[] = postDetails.filter((post: PostDetails) => !post.hide);
                  
                handleItem(email, username, profile_picture, postArray, following,followers, response.data[0].blocked,favorites, dispatch)
            }
            return 1
        })
        .catch((err) => {
            console.log(err);
        });

}


export const findProfileUrl = async (setData: (arg0: any) => void, userId: string) => {

    const queryParams = {
        userId: userId
    };
   const response = await baseURL
        .get("user/get-profile", { params: queryParams })
        .then((response) => {
            console.log(response, 'resultttttt');
            setData(response.data[0]);
            return response.data[0]
        })
        .catch((error) => {
            if (error.resonse.data.message == 'Authentication required') {
                throw 'authentication'
            } else {
                throw 'other'
            }
        });
        return response
}


export const postUrl = async (setData: { (value: SetStateAction<MyDataType[]>): void; (arg0: any): void; }) => {
  const response =  await baseURL
        .get('post')
        .then((response) => {
            console.log(response,'all postssss');
            setData(response.data);
            return response.data;
        })
        .catch((error) => {
                console.log(error);
                
            throw new Error(error)
        });

        return response;
}

export const fetchUserUrl = async (setData: { (value: SetStateAction<MyDataType[]>): void; (arg0: any): void; }) => {
    await axios
        .get('http://localhost:3000/api/user')
        .then((response) => {
            console.log(response, 'ressssssss');
            setData(response.data);
        })
        .catch((error) => {

            throw new Error(error)
        });
}

export const remainingPostUrl = async (setData: { (value: SetStateAction<MyDataType[]>): void; (arg0: any): void; }, image: string) => {
    const queryParams = {
        image: image
    };

    console.log('queryParams', queryParams);

    await baseURL
        .get("post/rest-posts", { params: queryParams })
        .then((response) => {
            console.log('response', response);
            setData(response.data);
        })
        .catch((error) => {
            throw new Error(error)
        });
}


export const uploadUrl = async (inputFile: File, navigate: (arg0: string, arg1: { state: any; }) => void,dispatch: Dispatch<AnyAction>) => {
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
                console.log(response.data, '5555555555555555');

                navigate("/singlepost", { state: response.data });
                handleAddPost(response.data,dispatch)
            }
        })
        .catch((error:Error) => {
            throw new Error(error.message)
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
        .catch((error) => {
            throw new Error(error)
        });
}

//handleddd......
export const loginUrl = async (
    password: String,
    email: String,
    dispatch: any,
    setIsUserNotExist: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },
    setUserLoginErr: { (value: SetStateAction<string | null>): void; (arg0: any): void; }, navigate: NavigateFunction) => {


    const LOGIN_API = LOGIN_URL;

    const data = {
        email: email,
        password: password,
    };

    await axios
        .post(LOGIN_API, data)
        .then(async (response) => {
            console.log(response);
            if (response?.data?.token) {
                console.log('not erorrrrr');
                setIsUserNotExist(false);
                localStorage.setItem("authToken", response.data.token);
                console.log(response.data.user, 'this is userrrrrr');
                const posts: object[] = []
                handleItem(response.data?.user?.email,
                    response.data?.user?.username, response.data?.user?.profile_picture, posts, response.data?.user?.following, response.data?.user?.followers, response?.data?.blocked,response?.data?.favorites,dispatch)
                navigate('/home')
            }
            // else {
            //     console.log("errorrrr");

            //     setIsUserNotExist(true);
            // }
        })
        .catch((error) => {
            console.log(error.response);

            setIsUserNotExist(true);
            setUserLoginErr(error?.response?.data?.errors[0].message);
            console.log("errrroorr isss", error);
        });
}

export const GoogleAuthUrl = async (userData: User, navigate: NavigateFunction, dispatch: Dispatch<AnyAction>) => {
    console.log(userData, 'userdataaaa');

    await axios
        .post("http://localhost:3000/api/auth/google", userData)
        .then(async (response) => {
            console.log(response);
            if (response?.data?.token) {
                console.log('not erorrrrr');
                localStorage.setItem("authToken", response.data.token);
                console.log(response.data.user, 'this is userrrrrr');
                const posts: object[] = []
                handleItem(response.data?.user?.email,
                    response.data?.user?.username, response.data?.user?.profile_picture, posts, response.data?.user?.following, response.data?.user?.followers,response.data?.user?.blocked,response.data?.user?.favorites,dispatch)
                navigate('/home')
            }
            // else {
            //     console.log("errorrrr");

            //     setIsUserNotExist(true);
            // }
        })
        .catch((error) => {
            console.log(error.response);

            // setIsUserNotExist(true);
            // setUserLoginErr(error?.response?.data?.errors[0].message);
            console.log("errrroorr isss", error);
        });
}


export const newsUrl = async (setData: (arg0: any) => void) => {
    await axios
        .get(
            "https://newsdata.io/api/1/news?apikey=pub_27925599203ac46cf288715b663d08486ab51&q=sports"
        )
        .then((response) => {
            console.log(response);
            const data = response.data.results;
            setData(data);

        }).catch((error) => {
            throw new Error(error)
        });
}


export const updateLikeUrl = async (action: string, post: string, username: string) => {

    const data = {
        action: action,
        username: username,
        image: post
    }

    baseURL.post('post/update-like', data).then((response) => {
        console.log(response);
    }).catch((error) => {
        throw new Error(error)
    });
}

export const savePostUrl = async (flag: string, image: string, username: string) => {

    const data = {
        image: image,
        username: username,
        flag: flag
    }

    console.log(data, 'data of save post');


    baseURL.post('user/save-post', data).then((response) => {
        console.log(response);
    }).catch((error) => {
        throw new Error(error)
    });
}


export const getCommentUrl = async (post: string,setData: { (value: SetStateAction<{ username: String; userProfile: String; comment: String; date: Date; }[]>): void; (value: any): void; (arg0: any): void; }) => {
    const queryParams = {
        post: post
    }



   const response = await baseURL.get('post/comment', { params: queryParams }).then((response) => {
        setData(response?.data?.comments.reverse())
        return response?.data
    }).catch((error) => {
        throw new Error(error)
    });

    return response;
}


export const fetchSinglePostUrl = async (image: string, setData: { (value: any): void; (arg0: any): void; }) => {
    const queryParams = {
        image:image
    };

    console.log('queryParams', queryParams);

   const response = await baseURL
        .get("post/get-single-post", { params: queryParams })
        .then((response) => {
            console.log('single post', response);
            setData(response.data);
            return response.data
        })
        .catch((error) => {
            throw new Error(error)
        });
        
        return response
}

export const postCommentUrl = async (post: String, username: String, profile: String, comment: String) => {


    const data = {
        post: post,
        username: username,
        profile: profile,
        comment: comment
    }

    await baseURL.post('post/comment', data).then((response) => {
        return response

    }).catch((error) => {
        throw new Error(error)
    });

}

export const signUpUrl = async (data: formikInitialValues, setIsSignupPage: (arg0: boolean) => void, setOpen: (arg0: boolean) => void, setSignUpErr: (arg0: string) => void) => {

    const API_URL = 'http://localhost:3000/api/user/add-user';

    await axios.post(API_URL, data)
        .then((response) => {
            console.log('SignUp successfull:', response.data);
            setIsSignupPage(false)
            setOpen(true)
        })
        .catch((error) => {
            console.log(error);

            setSignUpErr(error?.response?.data?.message)
        });
}

export const fetchMyPostUrl = async (username: string, setData: { (value: any): void; (arg0: any): void; }) => {
    const queryParams = {
        username: username
    };

    console.log(username,'00000000000');
    

    console.log('queryParams', queryParams);

   return await baseURL
        .get("user/get-my-post", { params: queryParams })
        .then((response) => {
            console.log('response', response);
            setData(response.data[0]);
            return response.data[0];
        })
        .catch((error) => {
            throw new Error(error)
        });
}


export const adminLoginUrl = async (
    email: String,
    password: String,
    setIsAdminNotExist: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },
    setAdminLoginErr: { (value: SetStateAction<string | null>): void; (arg0: any): void; }, isDashBoard: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {


    const data = {
        email: email,
        password: password,
    };


    await axios
        .post('http://localhost:3000/api/admin/login', data)
        .then(async (response) => {
            console.log(response);
            if (response?.data?.token) {
                console.log('not erorrrrr');
                setIsAdminNotExist(false);
                localStorage.setItem("adminToken", response.data.token);
                console.log(response.data.user, 'this is userrrrrr');
                // const posts: object[] = []
                //    handleItem(response.data?.user?.email,response.data?.user?.username, response.data?.user?.profile_picture,posts,response.data?.user?.following,response.data?.user?.followers, dispatch)
                isDashBoard(true)
            }
            // else {
            //     console.log("errorrrr");

            //     setIsUserNotExist(true);
            // }
        })
        .catch((error) => {
            console.log(error.response);

            setIsAdminNotExist(true);
            setAdminLoginErr(error?.response?.data?.errors[0].message);
            console.log("errrroorr isss", error);
        });
}


export const blockUserUrl = async (value: boolean, email: string) => {
    const data = {
        block: value,
        email: email
    }
    await axios.post('http://localhost:3000/api/admin/block-user', data).then((response) => {
        console.log(response);
    })
}


export const followUserUrl = async (value: string, follower: string, username: string) => {
    const data = {
        flag: value,
        follower: follower,
        username: username
    }

    baseURL.post('user/follow', data).then((response) => {
        return response

    }).catch((error) => {
        throw new Error(error)
    });
}

export const updateReportUrl = async(image:string,username:string,reason:string) =>{
    const data = {
        image:image,
        user:username,
        reason:reason
    }
    console.log(data);
    
    baseURL.post('post/report-post',data).then((response) => {
        return response

    }).catch((error) => {
        throw new Error(error)
    });
}

export const updateReportHideUrl = async(image:string,hide:boolean) =>{
    const data = {
        image:image,
        hide:hide
    }
    console.log(data);
    
   axios.post('http://localhost:3000/api/admin/block-post',data).then((response) => {
        return response

    }).catch((error) => {
        throw new Error(error)
    });
}

export const fetchChatListUrl = async ( setData: { (value: any): void; (arg0: any): void; }) => {


   return await baseURL
        .get("chat")
        .then((response) => {
            console.log('response', response);
            setData(response.data);
            return response.data;
        })
        .catch((error) => {
            throw new Error(error)
        });
}
 