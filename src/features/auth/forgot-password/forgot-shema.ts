import * as yup from "yup";

export const ForgotSchema = yup.object({
    email: yup
        .string()
        .required('This field is required')
        .email('Email must be a valid'),
})