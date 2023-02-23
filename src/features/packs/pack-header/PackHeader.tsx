import React, {FC, useState} from 'react';
import {Title} from "../../../common/components/title/Title";
import s from './PackHeader.module.scss'
import {Button} from "../../button/Button";
import {Modal} from "@mui/material";
import {useAppDispatch} from "../../../hooks/hooks";
import {addNewPackTC} from "../Packs-reducer";
import {ModalBox} from "../../../utils/StyledComponents/StyledComponents";


export const PackHeader: FC = () => {
    const dispatch = useAppDispatch()
    const [isOpen, setOpen] = useState(false)
    const addNewPack = () => dispatch(addNewPackTC('bla'))

    return <div className={s.wrapper}>
        <Title title={'Packs list'}/>
        <Button className={s.btn} title={'Add new pack'} onClick={() => setOpen(true)}/>
        <Modal open={isOpen} onClose={() => setOpen(false)}>
            <ModalBox>

            </ModalBox>
        </Modal>
    </div>
};

type PropsType = {
    title: string
    onClose: (isOpen: boolean) => void
    onSubmit: (namePack: string, privatePack: string) => void
    inputValue?: string
    checkboxValue?: boolean
}

const PackModal: FC<PropsType> = ({checkboxValue, inputValue, title, onSubmit, onClose}) => {


    return <>
        <div>
            <h3>{title}</h3>
            <button onClick={() => onClose(false)}>x</button>
        </div>
        <input value={inputValue} type="text"/>
        <input checked={checkboxValue} type="checkbox"/>
        <div>
            <button onClick={() => onClose(false)}>Cancel</button>
            <button>Save</button>
        </div>
    </>
}