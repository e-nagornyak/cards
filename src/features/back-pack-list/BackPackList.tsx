import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import s from './BackPackList.module.scss'

type PropsType = {
    className?: string
}

export const BackPackList: FC<PropsType> = ({className}) => {
    return <div className={s.wrapper + ' ' + className}>
        <NavLink className={s.link} to={'/packs'}>
            <svg className={s.arrow} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                    d="M21 8H11V5a1 1 0 0 0-1.707-.707l-7 7a1 1 0 0 0 0 1.414l7 7A1 1 0 0 0 11 19v-3h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
            </svg>
            Back to Packs List
        </NavLink>
    </div>
};

