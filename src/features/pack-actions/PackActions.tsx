import React, {FC, memo} from 'react';
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import {useAppSelector} from "../../hooks/hooks";
import {CardType} from "../../api/cards-api";
import {EditPackActions} from "./EditPackActions";
import {DeletePackActions} from "./DeletePackActions";
import {useNavigate} from "react-router-dom";

type PropsType = {
    pack: CardType
}

export const PackActions: FC<PropsType> = memo(({pack}) => {
    const navigate = useNavigate()
    const myId = useAppSelector(state => state.profile._id)
    const {cardsCount, _id, user_id, name} = pack
    const isPrivate = pack.private

    return (
        <>
            <IconButton onClick={() => navigate(`/learn-card/${_id}`)} disabled={cardsCount === 0}>
                <SchoolIcon fontSize={'small'}/>
            </IconButton>
            {user_id === myId && <>
                <EditPackActions packId={_id} isPrivate={isPrivate} name={name}/>
                <DeletePackActions name={name} packId={_id}/>
            </>}
        </>
    );
})



