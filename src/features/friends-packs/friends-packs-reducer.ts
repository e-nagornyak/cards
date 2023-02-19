import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cardsAPI, FriendsCardType} from './friends-packs-api';
import {AppThunk} from '../../app/store';
import {packsAPI} from '../../api/cards-api';
import {changeMax, changeRangeValue, changeTotalCount} from '../packs/filter-panel/Filter-panel-reducer';
import {errorUtils} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {setCardsPacks} from '../packs/Packs-reducer';
import {setAppStatus} from '../../app/app-reducer';

const initialState = {
    cards: [] as FriendsCardType[],

}

const slice = createSlice({
    name: 'friends-packs',
    initialState: initialState,
    reducers: {
        setFriendsPacks(state, action: PayloadAction<{ FriendsCards: FriendsCardType[] }>) {
            state.cards = action.payload.FriendsCards
        },


    }
})

export const friendsPacksReducer = slice.reducer
export const {setFriendsPacks} = slice.actions

export const fetchFriendsPacksTC = (cardsPack_id: string | undefined): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatus({status: 'loading'}))
    const params = getState().params
    try {
        const res = await cardsAPI.getCards({...params, cardsPack_id})
        console.log(res.data.cards)
        dispatch(setFriendsPacks({FriendsCards: res.data.cards}))

        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}