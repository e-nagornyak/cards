import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    cardAnswer: '',
    cardQuestion: '',
    sortCards: '',
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0
}

const slice = createSlice({
    name: 'cards-params',
    initialState: initialState,
    reducers: {
        changeCardAnswer(state, action: PayloadAction<{ cardAnswer: string }>) {
            state.cardAnswer = action.payload.cardAnswer
        },
        changeCardQuestion(state, action: PayloadAction<{ cardQuestion: string }>) {
            state.cardQuestion = action.payload.cardQuestion
        },
        changeSortCards(state, action: PayloadAction<{ sortCards: string }>) {
            state.sortCards = action.payload.sortCards
        },
        changeCardPage(state, action: PayloadAction<{ page: number }>) {
            state.page = action.payload.page
        },
        changeCardPageCount(state, action: PayloadAction<{ pageCount: number }>) {
            state.pageCount = action.payload.pageCount
        },
        setTotalCount(state, action: PayloadAction<{ cardsTotalCount: number }>) {
            state.cardsTotalCount = action.payload.cardsTotalCount
        },


    }
})

export const cardsParamsReducer = slice.reducer
export const {
    setTotalCount,
    changeCardAnswer,
    changeCardQuestion,
    changeSortCards,
    changeCardPage,
    changeCardPageCount
} = slice.actions