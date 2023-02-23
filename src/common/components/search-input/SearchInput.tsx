import React, {ChangeEvent, FC} from 'react';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';

type PropsType = {
    className?: string
    value: string
    onChange: (value: string) => void
    label?: string
    fullWidth?: boolean
}

export const SearchInput: FC<PropsType> = ({className, value, onChange, label, fullWidth}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onChange(e.currentTarget.value)

    return <TextField
        className={className}
        margin={'none'}
        placeholder={'Provide your text'}
        label={label}
        fullWidth={fullWidth}
        onChange={onChangeHandler}
        value={value}
        id="outlined-basic"
        variant="outlined"
        InputProps={{
            startAdornment: <SearchIcon/>,
        }}
    />
}

