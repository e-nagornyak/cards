import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {VisibilityOff} from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";

type SuperInputPropsType = {
    value: string
    onBlur: () => void
    onChange: (value: string) => void
    name: string
    error: boolean
    type: 'password' | 'text'
    margin: 'normal' | 'none' | 'dense'
}

export const SuperInput = (props: SuperInputPropsType) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
    const typeShowPassword = showPassword ? 'text' : 'password'
    const nameToCamelCase = props.name.slice(0, 1).toUpperCase() + props.name.slice(1, props.name.length)

    return <TextField
        type={props.type === 'password' ? typeShowPassword : 'text'}
        label={nameToCamelCase}
        margin={props.margin}
        value={props.value}
        onBlur={props.onBlur}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        error={props.error}
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
