import axios from "axios";

const instance = axios.create({
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
        return instance.post<RegisterResponseType>('/auth/register', data)
    },
    me() {
        return instance.post<AuthResponseType>('auth/me')
    },
    ping() {
    }
}


export type LoginParamsType= {
    email: string
    password: string
    rememberMe?: boolean
}

type AuthResponseType = {
    _id: string
    email: string
    rememberMe: boolean,
    isAdmin: boolean,
    name: string
    verified: boolean,
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token?: string
    tokenDeathTime?: number
    avatar?: string
    error?: string;
}

type RegisterResponseType = {
    addedUser: AuthResponseType
    error?: string
}