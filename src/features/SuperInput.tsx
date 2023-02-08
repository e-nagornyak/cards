import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {VisibilityOff} from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import {FieldError} from "react-hook-form";

type SuperInputPropsType = {
    value: string
    onBlur: () => void
    onChange: (value: string) => void
    name: string
    error: FieldError | undefined
    type: 'password' | 'text'
    margin: 'normal' | 'none' | 'dense'
}

export const SuperInput = (props: SuperInputPropsType) => {
    // для показування пароля
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    // для встановлення звийчайного типу чи "прихованого" за допомогою пропсів
    const typeShowPassword = showPassword ? 'text' : 'password'




    return <TextField
        type={props.type === 'password' ? typeShowPassword : 'text'}
        label={props.name}
        margin={props.margin}
        id="outlined-error-helper-text"
        helperText={props.error?.message}
        value={props.value}
        onBlur={props.onBlur}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        error={!!props.error?.message}
        InputProps={{
            endAdornment:
                props.type === 'password' ?
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                    : ''
        }}/>
}
