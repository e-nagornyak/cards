import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {editPackTC, setIsPrivate, setPackName} from "../../packs/Packs-reducer";
import {PackModal} from "./PackModal";

type PropsType = {
    setOpen: (isOpen: boolean) => void
    packId: string
    name: string
    packPrivate: boolean
}
export const EditPack: FC<PropsType> = ({setOpen, packId, name, packPrivate}) => {
    const dispatch = useAppDispatch()
    const packName = useAppSelector(state => state.packs.packName)
    const isPrivate = useAppSelector(state => state.packs.isPrivate)

    useEffect(() => {
        dispatch(setPackName({packName: name}))
        dispatch(setIsPrivate({isPrivate: packPrivate}))
    }, [])

    const changePack = () => {
        dispatch(editPackTC({name: packName, private: isPrivate, _id: packId}))
        setOpen(false)
    }

    const changePackName = (packName: string) => dispatch(setPackName({packName}))
    const changeIsPrivate = (isPrivate: boolean) => dispatch(setIsPrivate({isPrivate}))

    return <PackModal
        title={'Edit pack'}
        onOpen={setOpen}
        checkboxValue={isPrivate}
        onChangeCheckbox={changeIsPrivate}
        onChangeInput={changePackName}
        inputValue={packName}
        onSubmit={changePack}
    />
}