import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, typeForNewPassword} from '../../api/cards-api';
import {setAppStatus} from '../../app/app-reducer';
import {handleAppError} from "../../utils/error-utils";
import {AxiosError} from "axios";


// state
const initialState = {
    isLoggedIn: false
}

// створюємо reducer and AC
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        dispatch(setIsLoggedIn({value: true}))
        console.log(res);
    } catch (error) {
        handleAppError(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.status === 200) {
            dispatch(setIsLoggedIn({value: false}))
        }
    } catch (error) {
        handleAppError(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}

export const registerTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.register(data)
    } catch (error) {
        handleAppError(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}

export const forgotPasswordTC = (email: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.forgot(email)
    } catch (error) {
        handleAppError(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}
export const setNewPasswordTC = (data: typeForNewPassword) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        debugger
        const res = await authAPI.setNewPassword(data)
    } catch (error) {
        handleAppError(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}