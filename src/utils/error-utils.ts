import {Dispatch} from "@reduxjs/toolkit";
import {setAppError} from "../app/app-reducer";
import axios, {AxiosError} from "axios";

export const errorUtils = (e: Error | AxiosError<{ error: string }>, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppError({error}))
    } else {
        dispatch(setAppError({error: `Native error ${err.message}`}))
    }
}