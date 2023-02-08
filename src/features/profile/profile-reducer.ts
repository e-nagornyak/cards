import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, profileAPI} from "../../api/cards-api";
import {setAppStatus} from "../../app/app-reducer";
import {handleAppError} from "../../utils/error-utils";
import {AxiosError} from "axios";


// state
const initialState = {
    _id: "",
    email: "",
    name: "",
    publicCardPacksCount: 0,
    created: "",
    updated: "",
    avatar: "",
    rememberMe: false,
}
type ProfileType = typeof initialState
// створюємо reducer and AC
const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfile(state, action: PayloadAction<{ profile: any }>) {
            // state = {...action.payload.profile}
            state._id = action.payload.profile._id
            state.email = action.payload.profile.email
            state.name = action.payload.profile.name
            state.publicCardPacksCount = action.payload.profile.publicCardPacksCount
            state.created = action.payload.profile.created
            state.updated = action.payload.profile.updated
            state.avatar = action.payload.profile.avatar
            state.avatar = action.payload.profile.avatar
            state.rememberMe = action.payload.profile.rememberMe
        },
        updateNameProfile(state, action: PayloadAction<{ name: string }>) {
            state.name = action.payload.name
        },
        updatePhotoProfile(state, action: PayloadAction<{ avatar: string }>) {
            state.avatar = action.payload.avatar
        }
    }
})

export const profileReducer = slice.reducer
export const {setProfile, updateNameProfile, updatePhotoProfile} = slice.actions

// thunks
export const fetchProfileTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.me()
        dispatch(setProfile({profile: res.data}))
        // console.log(res);
    } catch (error: any) {
        // handleAppError(error, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}
export const updateNameTC = (title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await profileAPI.updateProfile({name: title})
        if (res.status === 200) {
            dispatch(updateNameProfile({name: title}))
        }
    } catch (error) {
        handleAppError(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}
export const updateAvatarTC = (avatar: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await profileAPI.updateProfile({avatar})
        if (res.status === 200) {
            dispatch(updatePhotoProfile({avatar}))
        }
    } catch (error) {
        handleAppError(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}