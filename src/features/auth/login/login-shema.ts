import * as yup from "yup";

export const LoginSchema = yup.object({
    email: yup
        .string()
        .required('This field is required')
        .email('Email must be a valid'),
    password: yup
        .string()
        .required('This field is required')
        .min(7, 'Minimum 7 characters' ),
    rememberMe: yup
        .boolean()
})