import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

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
export const loginTC = () => (dispatch: Dispatch) => {

}

export const logoutTC = () => (dispatch: Dispatch) => {

}