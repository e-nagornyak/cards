import React, {FC} from 'react';
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {ChangeIconWrapper, FormWrapper, ProfileIcon} from "../../utils/StyledComponents/StyledComponents";
import avatar from '../../assets/image/avatar.png'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export const Profile: FC = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profile = ''

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    const changePhotoHandler = () => {
        alert('bla')
    }
    return <FormWrapper>
        <h2>Personal Information</h2>
        <div style={{position: 'relative'}}>
            <ProfileIcon src={profile ? profile : avatar} alt=""/>
            <ChangeIconWrapper onClick={changePhotoHandler}>
                <PhotoCameraIcon sx={{color: 'white'}}/>
            </ChangeIconWrapper>
        </div>

        <span>Editable span</span>
        <p>blablabla@gmail.com</p>
        <button>Log Out</button>
    </FormWrapper>
};

