import React, {FC} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {addNewPackTC, setIsPrivate, setPackName} from "../../packs/Packs-reducer";
import {PackModal} from "./PackModal";

type PropsType = {
    setOpen: (isOpen: boolean) => void
}
export const AddNewPack: FC<PropsType> = ({setOpen}) => {
    const dispatch = useAppDispatch()
    const packName = useAppSelector(state => state.packs.packName)
    const isPrivate = useAppSelector(state => state.packs.isPrivate)
    const addNewPack = () => {
        dispatch(addNewPackTC({name: packName, private: isPrivate}))
        setOpen(false)
    }

    const changePackName = (packName: string) => dispatch(setPackName({packName}))
    const changeIsPrivate = (isPrivate: boolean) => dispatch(setIsPrivate({isPrivate}))

    return <PackModal
        title={'Add new pack'}
        onOpen={setOpen}
        checkboxValue={isPrivate}
        onChangeCheckbox={changeIsPrivate}
        onChangeInput={changePackName}
        inputValue={packName}
        onSubmit={addNewPack}
    />
}