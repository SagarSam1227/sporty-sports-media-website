import { formikInitialValues } from "../vite-env"
import * as Yup from "yup"

export const initialValues: formikInitialValues = {
    username: '',
    email: '',
    password: '',
    contact: ''
}


export const validationSchema = Yup.object({
    username: Yup.string().required('Name is required').matches(/^[a-zA-Z0-9_]+$/, 'Name can only contain letters, numbers, and underscores'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'),
    contact: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
})