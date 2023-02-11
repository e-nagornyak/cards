import * as yup from "yup";

export const signUpSchema = yup.object({
    email: yup
        .string()
        .required('This field is required')
        .email('Email must be a valid email'),
    password: yup
        .string()
        .min(7, 'Minimum 7 characters' )
        .required('This field is required'),
    confirmPassword: yup
        .string()
        .min(7, 'Minimum 7 characters')
        .oneOf([yup.ref('password'), undefined], 'Passwords do not match')
        .required('This field is required'),
})