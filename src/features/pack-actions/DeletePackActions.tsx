import React, {FC, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import {Modal} from "@mui/material";
import {ModalBox} from "../../utils/styled-components/StyledComponents";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {DeletePack} from "../modal/pack-modal/DeletePack";

type PropsType = {
    packId: string
    name: string
}

export const DeletePackActions: FC<PropsType> = ({packId,name}) => {
    const [isOpen, setOpen] = useState(false)

    return <>
        <IconButton onClick={() => setOpen(true)}>
            <DeleteOutlineIcon fontSize={'small'}/>
        </IconButton>
        <Modal disableRestoreFocus open={isOpen} onClose={() => setOpen(false)}>
            <ModalBox>
                <DeletePack name={name} setOpen={setOpen} id={packId}/>
            </ModalBox>
        </Modal>
    </>
};

