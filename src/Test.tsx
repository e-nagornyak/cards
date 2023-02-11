import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    email: yup
        .string()
        .email()
        .required(),
    age: yup
        .number()
        .positive()
        .integer()
        .required(),

}).required();
// .oneOf([yup.ref('password'), null], 'Пароли не совпадают')

type FormData = yup.InferType<typeof schema>;

export default function Test() {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {

            email: '',
            age: 0,
        }
    });
    const onSubmit = (data: FormData) => console.log(data);

    return (
        <form style={{margin: "20px"}} onSubmit={handleSubmit(onSubmit)}>


            <input
                placeholder={'Age'}
                {...register("age")} />
            <p>{errors.age?.message}</p>

            <input
                placeholder={'Email'}
                {...register("email")
                } />
            <p>{errors.email?.message}</p>

            <input type="submit"/>
        </form>
    );
}
