import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI, LoginParamsType, typeForNewPassword} from '../../api/cards-api';
import {setAppStatus} from '../../app/app-reducer';
import {errorUtils} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {AppThunk} from '../../app/store';

const initialState = {
    page: 1,
    pageCount: null,
    sort: null,
    search: '',
    isMyPacks: false
}

const slice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {}
})

export const packsReducer = slice.reducer
export const {} = slice.actions

export const loginTC = (data: LoginParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await authAPI.login(data)

    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}

