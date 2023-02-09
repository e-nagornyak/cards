import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<AuthResponseType>('auth/login', data)
    },
    logout() {
        return instance.delete<{ info: string }>('auth/me')
    },
    register(data: LoginParamsType) {
        return instance.post<RegisterResponseType>('auth/register', data)
    },
    me() {
        return instance.post<AuthResponseType>('auth/me')
    },
    forgot(email: string) {
        const message = {
            email: `${email}`,
            from: "test-front-admin <test@email.com>",
            message: `<div style="padding: 15px">
        password recovery link: 
        <a href='https://e-nagornyak.github.io/cards/#/set-new-password/$token$'>
        link</a>
         </div>`
        }

        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', message)
    },
    setNewPassword(data:typeForNewPassword) {
        return instance.post('/auth/set-new-password', data)
    },
}

export const profileAPI = {
    updateProfile(model: updateProfileRequest) {
        return instance.put('/auth/me', model)
    }
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type AuthResponseType = {
    _id: string
    email: string
    rememberMe: boolean,
    isAdmin: boolean,
    name: string
    verified: boolean,
    publicCardPacksCount: number
    created: string
    updated: string
    avatar: string
    __v: number
    token?: string
    tokenDeathTime?: number
    error?: string;
}

type RegisterResponseType = {
    addedUser: AuthResponseType
    error?: string
}
export type typeForNewPassword = {
    password: string
    resetPasswordToken: string
}

export type updateProfileRequest = { name: string } | { avatar: string }
