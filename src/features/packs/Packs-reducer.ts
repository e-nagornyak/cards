import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardType, packsAPI} from '../../api/cards-api';
import {setAppStatus} from '../../app/app-reducer';
import {errorUtils} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {AppThunk} from '../../app/store';
import {changeTotalCount, setMaxRangeValue, setMinRangeValue} from "./filter-panel/Filter-panel-reducer";

const slice = createSlice({
    name: 'packs',
    initialState: [] as CardType[],
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
    const {page, pageCount, packName, sortPacks, max, min, isMyPacks} = getState().packsParams
    const id = isMyPacks ? _id : ''
    const params = {page, pageCount, packName, sortPacks, max, min, user_id: id}

    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await packsAPI.getPacks(params)
        dispatch(setCardsPacks({cardsPacks: res.data.cardPacks}))
        dispatch(changeTotalCount({count: res.data.cardPacksTotalCount}))
        dispatch(setMaxRangeValue({max: res.data.maxCardsCount}))
        dispatch(setMinRangeValue({min: res.data.minCardsCount}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}

export const addNewPackTC = (title: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {

    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}
