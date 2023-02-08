import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";


type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activatedEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activatedViewMode = () => {
        if (title.trim() !== '' && title.length <= 20) {
            setEditMode(false)
            props.onChange(title)
        }

    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title.trim() !== '' && title.length <= 20) {
            setEditMode(false)
            props.onChange(title)
        }
    }


    return editMode
        ? <TextField
            sx={{padding: '5px 0'}}
            label="NickName" variant="standard"
            // onBlurCapture={activatedViewMode}
            value={title}
            id="outlined-error"
            error={title.trim() === '' || title.length >= 20}
            autoFocus
            onChange={onChangeTitleHandler}
            onKeyDown={onKeyDownEnterHandler}
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <Button
                            sx={{padding: '0', minWidth: '50px', marginBottom: '3px'}}
                            variant={"contained"}
                            onClick={activatedViewMode}
                            color={'primary'}
                        >
                            SAVE
                        </Button>
                    </InputAdornment>
            }}/>
        : <div>
            <span>{props.title}</span>
            <BorderColorIcon cursor={'pointer'} onClick={activatedEditMode} fontSize={'small'}/>
        </div>
}