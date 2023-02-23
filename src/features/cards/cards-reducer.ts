import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cardsAPI, CardType} from './cards-api';
import {errorUtils} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {setAppStatus} from '../../app/app-reducer';
import {AppThunk} from "../../app/store";
import {setTotalCount} from "./cards-params-reducer";

const initialState = {
    cards: [] as CardType[],
    packName: '',
    packPrivate: false,
    packUserId: ''
}

const slice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        setCards(state, action: PayloadAction<{ date: { cards: CardType[], packName: string, packPrivate: boolean, packUserId: string } }>) {
            state.cards = action.payload.date.cards
            state.packName = action.payload.date.packName
            state.packPrivate = action.payload.date.packPrivate
            state.packUserId = action.payload.date.packUserId
        },
    }
})

export const cardsReducer = slice.reducer
export const {setCards} = slice.actions

export const fetchCards = (cardsPack_id: string | undefined): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatus({status: 'loading'}))
    const params = getState().cardsParams
    try {
        const res = await cardsAPI.getCards({...params, cardsPack_id})
        dispatch(setCards({date: res.data}))
        dispatch(setTotalCount({cardsTotalCount: res.data.cardsTotalCount}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}


