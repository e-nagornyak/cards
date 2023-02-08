import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/auth/auth-reducer";
import {appReducer} from "./app-reducer";
import {profileReducer} from "../features/profile/profile-reducer";

// загальна структура нашого об'єкта стану
const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer
})

// store
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// type state
export type AppRootStateType = ReturnType<typeof rootReducer>

// types
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store;