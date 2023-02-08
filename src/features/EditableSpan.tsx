import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';

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
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            props.onChange(title)
        }
    }


    return editMode
        ? <input
            onKeyDown={onKeyDownEnterHandler}
            onBlur={activatedViewMode}
            value={title}
            autoFocus
            onChange={onChangeTitleHandler}/>
        : <div>
            <span>{props.title}</span>
            <BorderColorIcon cursor={'pointer'} onClick={activatedEditMode} fontSize={'small'}/>
        </div>
}