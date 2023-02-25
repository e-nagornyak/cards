import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from "../../../app/store";
import {errorUtils} from "../../../utils/error-utils";
import {AxiosError} from "axios";

const initialState = {
    //min and max value for range
    maxRange: 0,
    minRange: 0,
    // params
    min: 0,
    max: 0,
    sortPacks: '',
    page: 1,
    pageCount: 10,
    packName: '',
    cardPacksTotalCount: 0,
    isMyPacks: false
}

const slice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setMaxRangeValue(state, action: PayloadAction<{ max: number }>) {
            state.maxRange = action.payload.max
        },
        setMinRangeValue(state, action: PayloadAction<{ min: number }>) {
            state.minRange = action.payload.min
        },
        changeTotalCount(state, action: PayloadAction<{ count: number }>) {
            state.cardPacksTotalCount = action.payload.count
        },
        changeSearchValue(state, action: PayloadAction<{ packName: string }>) {
            state.packName = action.payload.packName
        },
        changePrivate(state, action: PayloadAction<{ isMyPacks: boolean }>) {
            state.isMyPacks = action.payload.isMyPacks
            state.min = 0
            state.max = 0
        },
        changeMin(state, action: PayloadAction<{ min: number }>) {
            state.min = action.payload.min
        },
        changeMax(state, action: PayloadAction<{ max: number }>) {
            state.max = action.payload.max
        },
        setSortPacks(state, action: PayloadAction<{ sort: string }>) {
            state.sortPacks = action.payload.sort
        },
        changePageCount(state, action: PayloadAction<{ pageCount: number }>) {
            state.pageCount = action.payload.pageCount
        },
        changePage(state, action: PayloadAction<{ page: number }>) {
            state.page = action.payload.page
        },
        resetParams(state) {
            state.min = 0
            state.max = 0
            state.sortPacks = ''
            state.packName = ''
            state.isMyPacks = false
        }
    }
})

export const packsFilterReducer = slice.reducer
export const {
    changeSearchValue,
    changePrivate,
    changeMin,
    changeMax,
    changePage,
    changePageCount,
    setSortPacks,
    changeTotalCount,
    setMinRangeValue,
    setMaxRangeValue,
    resetParams,
} = slice.actions

