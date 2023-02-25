import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import s from './PackModal.module.scss'
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

type PropsType = {
    title: string
    onOpen: (isOpen: boolean) => void
    onChangeCheckbox: (isPrivate: boolean) => void
    onChangeInput: (packName: string) => void
    inputValue: string
    checkboxValue: boolean
    onSubmit: () => void
}

export const PackModal: FC<PropsType> = (
    {
        onChangeInput,
        onChangeCheckbox,
        inputValue,
        title,
        onOpen,
        checkboxValue,
        onSubmit
    }) => {
    const [error, setError] = useState(false)

    const InputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeInput(e.currentTarget.value)
        setError(false)
    }

    const CheckboxOnChange = (e: ChangeEvent<HTMLInputElement>) => onChangeCheckbox(e.currentTarget.checked)

    const onSubmitHandler = () => {
        if (inputValue.trim().length) {
            onSubmit()
            setError(false)
            onOpen(false)
        } else {
            setError(true)
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmitHandler()
        }
    }

    const closeModal = () => onOpen(false)

    return <div className={s.wrapper}>
        <div className={s.title_wrapper}>
            <h3>{title}</h3>
            <button onClick={closeModal}>x</button>
        </div>
        <TextField
            autoFocus
            required
            color={'secondary'}
            onKeyDown={onKeyDownHandler}
            onChange={InputOnChange}
            value={inputValue}
            helperText={error && 'Write some name'}
            error={error}
        />
        <div>
            <FormControlLabel
                label={'Private pack'}
                control={<Checkbox color={'secondary'} onChange={CheckboxOnChange}
                                   checked={checkboxValue}/>}/>
        </div>
        <div className={s.btn_group}>
            <Button
                onClick={closeModal}
                color={'inherit'}
                variant={'contained'}>
                Cancel
            </Button>
            <Button
                type={'submit'}
                onClick={onSubmitHandler}
                color={'secondary'}
                variant={'contained'}>
                Save
            </Button>
        </div>
    </div>
}