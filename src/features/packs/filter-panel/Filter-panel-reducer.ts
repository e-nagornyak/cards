import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from "../../../app/store";

const initialState = {
    rangeOptions: 100,
    min: 0,
    max: 100,
    sortPacks: '',
    page: 1,
    pageCount: 4,
    packName: '',
    cardPacksTotalCount: 0,
    isMyPacks: false
}

const slice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        changeRangeValue(state, action: PayloadAction<{ rangeOptions: number }>) {
            state.rangeOptions = action.payload.rangeOptions
        },
        changeSearchValue(state, action: PayloadAction<{ packName: string }>) {
            state.packName = action.payload.packName
        },
        changePrivate(state, action: PayloadAction<{ isMyPacks: boolean }>) {
            state.isMyPacks = action.payload.isMyPacks
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
        changeTotalCount(state, action: PayloadAction<{ count: number }>) {
            state.cardPacksTotalCount = action.payload.count
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
    changeRangeValue,
    // resetParams,
} = slice.actions

export const fetchParamsTC = (): AppThunk => async (dispatch) => {
    // dispatch(setAppStatus({status: 'loading'}))
    // try {
    //     // const res = await packsAPI.getPacks()
    //
    // } catch (error) {
    //     errorUtils(error as AxiosError, dispatch)
    // }
}

