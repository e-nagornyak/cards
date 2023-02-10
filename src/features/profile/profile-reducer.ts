import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, profileAPI} from "../../api/cards-api";
import {setAppStatus} from "../../app/app-reducer";
import {errorUtils} from "../../utils/error-utils";
import {AxiosError} from "axios";

type ProfileType = {
    _id: string
    email: string
    name: string
    publicCardPacksCount: number
    created: string
    updated: string
    avatar: string
    rememberMe: boolean
}

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
// створюємо reducer and AC
const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfile(state, action: PayloadAction<{ profile: ProfileType }>) {
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
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}
export const updateNameTC = (name: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await profileAPI.updateProfile({name})
        dispatch(updateNameProfile({name}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}
export const updateAvatarTC = (avatar: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await profileAPI.updateProfile({avatar})
        dispatch(updatePhotoProfile({avatar}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}