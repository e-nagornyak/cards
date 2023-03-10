import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../api/cards-api";
import {setIsLoggedIn} from "../features/auth/auth-reducer";
import {AppThunk} from "./store";
import {setProfile} from "../features/profile/profile-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const appReducer = slice.reducer
export const {setAppError, setAppInitialized, setAppStatus} = slice.actions

export const initializeAppTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await authAPI.me()
        dispatch(setIsLoggedIn({value: true}))
        dispatch(setProfile({profile: res.data}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        console.warn(error)
        // errorUtils(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppInitialized({isInitialized: true}))
    }
}