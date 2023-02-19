import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    cardAnswer: '',
    cardQuestion: '',
    sortCards: '',
    page: 1,
    pageCount: 4
}

const slice = createSlice({
    name: 'friends-params',
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


    }
})

export const friendsParamsReducer = slice.reducer
export const {changeCardAnswer,changeCardQuestion,changeSortCards,changeCardPage,changeCardPageCount} = slice.actions