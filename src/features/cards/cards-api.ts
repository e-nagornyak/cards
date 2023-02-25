import {CardType, instance} from '../../api/cards-api';

export const cardsAPI = {
    getCards(params: CardParamsType) {
        return instance.get<CardsResponseType>(`/cards/card`, {params})
    }
}
export type CardParamsType = {
    cardAnswer: string,
    cardQuestion: string,
    cardsPack_id: string | undefined,
    sortCards: string,
    page: number,
    pageCount: number
}

export type CardsResponseType = {
    cards: CardType[],
    cardsTotalCount: number,
    page: number,
    pageCount: number,
    packUserId: string
    packPrivate: boolean
    packName: string
}