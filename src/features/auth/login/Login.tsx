import React, {FC, useState} from 'react';
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {VisibilityOff} from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";

export const Login: FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();


    return <Grid sx={{display: 'flex', alignItems: 'center', height: '90vh'}} container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl sx={{
                boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)",
                borderRadius: "2px", p: '33px', alignItems: 'center'
            }}>
                <FormLabel>
                    <h2>Sing in</h2>
                </FormLabel>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                    />
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        margin="normal"
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
                        }}
                    />
                    <FormControlLabel
                        label={'Remember me'}
                        control={
                            <Checkbox
                            />
                        }/>
                    <a href={'/'}>Forgot Password?</a>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Sing in
                    </Button>
                    <p>Already have an account?</p>
                    <a href="/">Sing Up</a>
                </FormGroup>
            </FormControl>
        </Grid>
    </Grid>
};

