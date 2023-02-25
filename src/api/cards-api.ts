import axios from 'axios';

export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

const link = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/#/set-new-password/$token$' : 'https://e-nagornyak.github.io/cards/#/set-new-password/$token$'

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
            from: 'test-front-admin <test@email.com>',
            message: `<div style="padding: 15px">
        password recovery link: 
        <a href={link}>link</a>
         </div>`
        }

        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', message)
    },
    setNewPassword(data: typeForNewPassword) {
        return instance.post('/auth/set-new-password', data)
    },
}

export const profileAPI = {
    updateProfile(model: updateProfileRequest) {
        return instance.put('/auth/me', model)
    }
}
export const packsAPI = {
    getPacks(params?: packsParamsType) {
        return instance.get<PacksResponseType>(`/cards/pack`, {params})
    },
    addNewPack(cardsPack: newPackType) {
        return instance.post('/cards/pack', {cardsPack})
    },
    editPack(cardsPack: editPackType) {
        return instance.put('/cards/pack', {cardsPack})
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    }
}


export type newPackType = {
    name: string,
    private: boolean
    deckCover?: string,
}

export type editPackType = {
    _id: string,
    name: string,
    private: boolean
}

export type packsParamsType = {
    minCardsCount?: number | null,
    maxCardsCount?: number | null,
    sortPacks?: string,
    page?: number,
    pageCount?: number
    packName?: string,
    user_id?: string
}


export type CardType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    private: boolean
    user_name: string
    answer: string
    cardsPack_id: string
    comments: string
    grade: number
    question: string
    questionImg: string
    rating: number
    shots: number
    type: string
}

export type PacksResponseType = {
    cardPacks: Array<CardType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
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
