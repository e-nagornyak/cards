import {instance} from '../../api/cards-api';

export const cardsAPI = {
    getCards(params:FriendsCardsParamsType) {
        return instance.get<FriendsCardsResponseType>(`/cards/card`, {params})
    }
}
export type FriendsCardsParamsType = {
    cardAnswer:string,
    cardQuestion:string,
    cardsPack_id:string|undefined,
    sortCards:string,
    page:number,
    pageCount:number
}
export type FriendsCardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id:string
}
export type FriendsCardsResponseType = {
    cards: Array<FriendsCardType>,
    cardsTotalCount:number,
    maxGrade:number,
    minGrade:number,
    page:number,
    pageCount:number,
    packUserId:string
}