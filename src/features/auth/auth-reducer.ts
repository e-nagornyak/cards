import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, typeForNewPassword} from '../../api/cards-api';
import {setAppStatus} from '../../app/app-reducer';
import {errorUtils} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {AppThunk} from "../../app/store";

const initialState = {
    isLoggedIn: false,
    isRegistered: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        },
        setIsRegistered(state, action: PayloadAction<{ value: boolean }>) {
            state.isRegistered = action.payload.value
        },
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn, setIsRegistered} = slice.actions

export const loginTC = (data: LoginParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await authAPI.login(data)
        dispatch(setIsLoggedIn({value: true}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await authAPI.logout()
        dispatch(setIsLoggedIn({value: false}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}

export const registerTC = (data: LoginParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await authAPI.register(data)
        dispatch(setIsRegistered({value: true}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}

export const forgotPasswordTC = (email: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await authAPI.forgot(email)
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}

export const setNewPasswordTC = (data: typeForNewPassword): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await authAPI.setNewPassword(data)
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
}