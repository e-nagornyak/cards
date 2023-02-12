import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardType, packsAPI} from '../../api/cards-api';
import {setAppStatus} from '../../app/app-reducer';
import {errorUtils} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {AppThunk} from '../../app/store';
import {changeMax, changeRangeValue, changeTotalCount} from "./filter-panel/Filter-panel-reducer";

const initialState: CardType[] = []

const slice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {
        setCardsPacks(state, action: PayloadAction<{ cardsPacks: CardType[] }>) {
            return action.payload.cardsPacks
        }
    }
})

export const packsReducer = slice.reducer
export const {setCardsPacks} = slice.actions

export const fetchPacksTC = (): AppThunk => async (dispatch, getState) => {
    const {_id} = getState().profile
    const {page, pageCount, packName, sortPacks, max, min, isMyPacks} = getState().packsFilter
    const id = isMyPacks ? _id : ''
    const params = {page, pageCount, packName, sortPacks, max, min, user_id: id}

    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await packsAPI.getPacks(params)
        dispatch(setCardsPacks({cardsPacks: res.data.cardPacks}))
        dispatch(changeRangeValue({rangeOptions: res.data.maxCardsCount}))
        dispatch(changeMax({max: res.data.maxCardsCount}))
        dispatch(changeTotalCount({count: res.data.cardPacksTotalCount}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}
