import React, {FC} from 'react';
import TextField from "@mui/material/TextField";
import s from "../pack-modal/PackModal.module.scss";
import Button from "@mui/material/Button";

type PropsType = {
    title: string
    selectorValue: any
    selectorOnChange: (value: any) => void
    questionValue: string
    questionOnChange: (value: string) => void
    answerValue: string
    answerOnChange: (value: string) => void
    onClose: (isOpen: boolean) => void
}

export const CardModal: FC<PropsType> = (
    {
        title,
        selectorValue,
        selectorOnChange,
        questionValue,
        answerOnChange,
        answerValue,
        questionOnChange,
        onClose
    }) => {
    const onCloseHandler = () => onClose(false)

    return <div>
        <div>
            <h1>{title}</h1>
            <button onClick={onCloseHandler}>x</button>
        </div>
        <select name="" id=""></select>
        <TextField label={'LAbel'}/>
        <TextField label={'LAbel'}/>
        <div className={s.btn_group}>
            <Button
                onClick={onCloseHandler}
                color={'inherit'}
                variant={'contained'}>
                Cancel
            </Button>
            <Button
                type={'submit'}
                onClick={() => {}}
                color={'secondary'}
                variant={'contained'}>
                Save
            </Button>
        </div>

    </div>
};

