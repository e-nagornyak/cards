import React, {FC} from "react";
import {useAppDispatch} from "../../../hooks/hooks";
import {deletePackTC} from "../../packs/Packs-reducer";
import Button from "@mui/material/Button";
import s from './DeletePack.module.scss'

type PropsType = {
    setOpen: (isOpen: boolean) => void
    id: string
    name: string
}

export const DeletePack: FC<PropsType> = ({setOpen, id, name}) => {
    const dispatch = useAppDispatch()

    const deletePack = () => {
        dispatch(deletePackTC(id))
        setOpen(false)
    }
    const closeHandler = () => setOpen(false)

    return <div className={s.wrapper}>
        <h1>Delete Pack</h1>
        <p>Do you really want to remove <span>{name}</span>?
            <br/>All cards will be deleted.</p>
        <div className={s.btn_group}>
            <Button
                variant={'contained'}
                color={'inherit'}
                onClick={closeHandler}>
                Cancel
            </Button>
            <Button
                variant={'contained'}
                color={'warning'}
                onClick={deletePack}>
                Delete
            </Button>
        </div>
    </div>
}