import React, {FC} from 'react';
import s from './Title.module.scss'

type PropsType = {
    title: string
}

export const Title: FC<PropsType> = ({title}) => {
    return <h1 className={s.title}>{title}</h1>
};

