import {Dispatch} from "@reduxjs/toolkit";
import {setAppError} from "../app/app-reducer";


export const handleAppError = (error:  any, dispatch: Dispatch) => {
    if (error.message === 'Network Error') {
        dispatch(setAppError({error: error.message}))
    } else {

            dispatch(setAppError({error: error.response.data.error}))

    }
}