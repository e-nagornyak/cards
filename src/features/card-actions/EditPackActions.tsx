import React, {FC, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {Modal} from "@mui/material";
import {ModalBox} from "../../utils/styled-components/StyledComponents";
import {EditPack} from "../modal/pack-modal/EditPack";

type PropsType = {
    isPrivate: boolean
    name: string
    packId: string
}

export const EditPackActions: FC<PropsType> = ({packId, name,isPrivate}) => {
    const [isOpen, setOpen] = useState(false)

    return <>
        <IconButton onClick={() => setOpen(true)}>
            <EditIcon fontSize={'small'}/>
        </IconButton>
        <Modal disableRestoreFocus open={isOpen} onClose={() => setOpen(false)}>
            <ModalBox>
                <EditPack packPrivate={isPrivate} name={name} packId={packId}
                          setOpen={setOpen}/>
            </ModalBox>
        </Modal>
    </>

};

