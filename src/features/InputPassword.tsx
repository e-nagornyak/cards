import React, {FC, useState} from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {VisibilityOff} from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";

type InputPasswordPropsType = {
    name: string
    label: string
    margin: 'normal' | 'none' | 'dense'
    control: any
}

export const InputPassword: FC<InputPasswordPropsType> = ({name, label, margin, control}) => {
    const [showPassword, setShowPassword] = useState(false);
    const {error, isTouched} = control.getFieldState(name)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    return <TextField
        type={showPassword ? 'text' : 'password'}
        label={label}
        margin={margin}
        id="outlined-error-helper-text"
        {...control.register(name)}
        helperText={error?.message}
        error={isTouched && !!error?.message}
        InputProps={{
            endAdornment:
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                </InputAdornment>
        }}/>
}
