import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../api/cards-api";
import {AxiosError} from "axios";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    // чи відбувається зараз взаємодія з сервером
    status: 'idle' as RequestStatusType,
    // глобальні помилки
    error: null as null | string,
    // true коли відбулась ініціалізація (перевірка користувача)
    isInitialized: false
}

// створюємо reducer and AC
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppError(state, action: PayloadAction<{ error: null | string }>) {
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


//thunks
export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.me()
        console.log(res);
    } catch (error: any) {
        console.log(error.response.data.error)
    } finally {
        dispatch(setAppInitialized({isInitialized: true}))
    }
}