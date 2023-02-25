import React from 'react'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setAppError} from "../../app/app-reducer";
import Snackbar from '@mui/material/Snackbar/Snackbar';
import Alert from '@mui/material/Alert/Alert';

export const ErrorSnackbar = () => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError({error: null}))
    }

    return <div>
        <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
            <Alert variant="filled" severity="error" onClose={handleClose}>
                {error}
            </Alert>
        </Snackbar>
    </div>
}