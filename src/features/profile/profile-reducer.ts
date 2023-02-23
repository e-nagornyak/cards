import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, profileAPI} from "../../api/cards-api";
import {setAppStatus} from "../../app/app-reducer";
import {errorUtils} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {AppThunk} from "../../app/store";

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

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfile(state, action: PayloadAction<{ profile: ProfileType }>) {
            return action.payload.profile
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

export const fetchProfileTC = (): AppThunk => async (dispatch) => {
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
export const updateNameTC = (name: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await profileAPI.updateProfile({name})
        dispatch(updateNameProfile({name}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}
export const updateAvatarTC = (avatar: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await profileAPI.updateProfile({avatar})
        dispatch(updatePhotoProfile({avatar}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'idle'}))
    }
}