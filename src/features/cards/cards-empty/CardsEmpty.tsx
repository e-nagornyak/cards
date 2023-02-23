import React, {FC} from 'react';
import s from "../Cards.module.scss";
import {Button} from "../../button/Button";

type PropsType = {
    onClick: () => void
}

export const CardsEmpty: FC<PropsType> = ({onClick}) => {
    return <div className={s.empty}>
        <h2>This pack is empty. Click add new card to fill this pack</h2>
        <Button title={'Add new cards'} className={s.empty_btn} onClick={onClick}/>
    </div>
};

