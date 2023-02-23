import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/auth/auth-reducer";
import {appReducer} from "./app-reducer";
import {profileReducer} from "../features/profile/profile-reducer";
import {packsReducer} from '../features/packs/Packs-reducer';
import {packsFilterReducer} from "../features/packs/filter-panel/Filter-panel-reducer";
import {cardsReducer} from "../features/cards/cards-reducer";
import {cardsParamsReducer} from "../features/cards/cards-params-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    packs: packsReducer,
    packsParams: packsFilterReducer,
    cards: cardsReducer,
    cardsParams: cardsParamsReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store;