import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardType, editPackType, newPackType, packsAPI} from '../../api/cards-api';
import {setAppStatus} from '../../app/app-reducer';
import {errorUtils} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {AppThunk} from '../../app/store';
import {
    changeTotalCount,
    setMaxRangeValue,
    setMinRangeValue
} from "./filter-panel/Filter-panel-reducer";

const initialState = {
    packs: [] as CardType[],
    packName: '',
    isPrivate: false
}

const slice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {
        setCardsPacks(state, action: PayloadAction<{ cardsPacks: CardType[] }>) {
            state.packs = action.payload.cardsPacks
        },
        setPackName(state, action: PayloadAction<{ packName: string }>) {
            state.packName = action.payload.packName
        },
        setIsPrivate(state, action: PayloadAction<{ isPrivate: boolean }>) {
            state.isPrivate = action.payload.isPrivate
        }
    }
})

export const packsReducer = slice.reducer
export const {setCardsPacks, setPackName, setIsPrivate} = slice.actions

export const fetchPacksTC = (): AppThunk => async (dispatch, getState) => {
    const {_id} = getState().profile
    const params = getState().packsParams
    const user_id = params.isMyPacks ? _id : ''

    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await packsAPI.getPacks({...params, user_id})
        dispatch(setCardsPacks({cardsPacks: res.data.cardPacks}))
        dispatch(changeTotalCount({count: res.data.cardPacksTotalCount}))
        dispatch(setMaxRangeValue({max: res.data.maxCardsCount}))
        dispatch(setMinRangeValue({min: res.data.minCardsCount}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}

export const addNewPackTC = (cardsPack: newPackType): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await packsAPI.addNewPack(cardsPack)
        dispatch(setPackName({packName: ''}))
        dispatch(setIsPrivate({isPrivate: false}))
        dispatch(fetchPacksTC())
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}

export const editPackTC = (cardsPack: editPackType): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await packsAPI.editPack(cardsPack)
        dispatch(fetchPacksTC())
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}

export const deletePackTC = (id: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await packsAPI.deletePack(id)
        dispatch(fetchPacksTC())
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}