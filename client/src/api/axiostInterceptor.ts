import axios from 'axios';
import { BASE_URL } from './urls';


const baseURL = axios.create({
    baseURL: BASE_URL
})

baseURL.interceptors.request.use(
    config => {
        const token = localStorage?.getItem("authToken")
        if (token?.length) {
            config.headers["Authorization"] = `Bearer ${token}`
        } else {
            delete config.headers["Authorization"]
        }
        return config
    },
    error => {
        console.log('Interceptor encounted an error')
        return Promise.reject(error)
    }
)

export default baseURL