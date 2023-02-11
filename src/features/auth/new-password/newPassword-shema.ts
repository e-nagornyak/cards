import * as yup from "yup";

export const NewPasswordShema = yup.object({
    password: yup
        .string()
        .required('This field is required')
        .min(7, 'Minimum 7 characters' ),
})