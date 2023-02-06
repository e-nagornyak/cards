import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from '../../api/cards-api';
import {setAppInitialized, setAppStatus} from '../../app/reducer/app-reducer';

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
    },
    extraReducers:{

    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

// thunks
export const loginTC = (data:LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        dispatch(setIsLoggedIn({value:true}))
        console.log(res);
    } catch (error: any) {
        console.log(error.response.data.error)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}

export const logoutTC = () => (dispatch: Dispatch) => {

}