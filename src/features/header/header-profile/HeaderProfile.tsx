import React, {FC} from 'react';
import s from "./HeaderProfile.module.scss";
import {NavLink} from "react-router-dom";
import avatar from "../../../assets/image/avatar.png";
import {MenuItem} from "@mui/material";
import Menu from '@mui/material/Menu';
import {useAppDispatch} from "../../../hooks/hooks";
import {logoutTC} from "../../auth/auth-reducer";

type PropsType = {
    name: string
    src?: string
}

export const HeaderProfile: FC<PropsType> = ({src, name}) => {
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null)

    const logoutHandler = () => {
        dispatch(logoutTC())
        handleClose()
    }

    return <div className={s.profile_wrapper}>
        <span>{name}</span>
        <div className={s.avatar_wrapper}>
            <img onClick={handleClick} alt='avatar' src={src || avatar}></img>
        </div>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}><NavLink className={s.link} to={'/profile'}>Profile</NavLink></MenuItem>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
    </div>
};

