import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Signup from '../UserSignup/UserSignup';
import { LoginProps, formikInitialValues } from '../../vite-env';
import { setUser } from '../../redux/Slices/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import LoginForm from './LoginForm';


function Login({ open, setOpen }: LoginProps) {
    const [isSignupPage, setIsSignupPage] = useState<boolean>(false)
    const [password, setPassword] = useState<String>('')
    const cancelButtonRef = useRef(null)
    const [isUserNotExist, setIsUserNotExist] = useState<boolean>(false)
    const [userLoginErr, setUserLoginErr] = useState<string | null>(null)
    const [email, setEmail] = useState<String>('')
    const dispatch = useDispatch()
    const [isLoginClicked, setIsLoginClicked] = useState<boolean>(false)



    const handleItem = (email: string, userName: string) => {
        dispatch(setUser({ email: email, username: userName }))
    }


    const handleCloseModal = () => {
        setIsSignupPage(false);
        setOpen(false);
    };

    // const dismissUserNotFound = () => {
    //     setIsUserNotExist(false)
    //     setOpen(true)
    // }


    // const resetLoginForm = () => {
    //     setIsLoginClicked(false);
    //     setIsUserNotExist(false);
    //     setPassword('');
    //     setEmail(null);
    // };


    useEffect(() => {

        if (open) {
            // resetLoginForm();
        }

        if (isLoginClicked) {

            const API_URL = 'http://localhost:3000/api/auth/login'

            const data = {
                email: email,
                password: password
            }
            console.log('user and email...', data);


            axios.post(API_URL, data).then((response) => {
                console.log(response);
                if (response?.data?.token) {
                    localStorage.setItem('authToken', response.data.token);
                    console.log(response.data.user);
                    handleItem(response.data?.user?.email, response.data?.user?.username)
                    setIsUserNotExist(false)


                }
                else {
                    console.log('errorrrr');

                    setIsUserNotExist(true)
                }
            }).catch((error) => {
                setIsUserNotExist(true)
                setUserLoginErr(error.response.data.message)
                console.log('errrroorr isss', error);

            })
        }
    }, [isLoginClicked, open, email, password])


    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <div className={`fixed inset-0 z-10 overflow-y-auto ${open ? 'backdrop-blur-sm' : ''}`}>
                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} open={open} onClose={handleCloseModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >

                                    <Dialog.Panel className="relative flex flex-col justify-center min-h-screen overflow-hidden w-80">
                                        {isSignupPage ? <Signup setOpen={setOpen} setIsSignupPage={setIsSignupPage} open={false} isSignupPage={false} /> :
                                           <LoginForm setIsLoginClicked={setIsLoginClicked} setEmail={setEmail} setPassword={setPassword} isUserNotExist={isUserNotExist} setIsUserNotExist={setIsUserNotExist} message={userLoginErr} setIsSignupPage={setIsSignupPage}/>} 
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </Transition.Root>
        </>


    )
}

export default Login;