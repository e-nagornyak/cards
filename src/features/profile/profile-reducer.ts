import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AuthResponseType} from "../../api/cards-api";


// state
const initialState = {
    _id: "",
    email: "",
    name: "",
    verified: false,
    publicCardPacksCount: 0,
    created: "",
    updated: "",
    __v: 0,
    token: "",
    tokenDeathTime: 0,
    avatar: "",
    error: ""
}

// створюємо reducer and AC
const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfile(state, action: PayloadAction<{ profile: AuthResponseType }>) {
            // state = action.payload.profile
        },
        updateProfile(state, action: PayloadAction<any>) {
        }
    }
})

export const profileReducer = slice.reducer
// export const {setIsLoggedIn} = slice.actions

// thunks
// export const TC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
//     dispatch(setAppStatus({status: 'loading'}))
//     try {
//         const res = await authAPI.login(data)
//         dispatch(setIsLoggedIn({value: true}))
//         console.log(res);
//     } catch (error: any) {
//         handleAppError(error, dispatch)
//     } finally {
//         dispatch(setAppStatus({status: 'idle'}))
//     }
// }
