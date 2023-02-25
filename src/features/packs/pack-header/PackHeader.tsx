import React, {FC, useState} from 'react';
import {Title} from "../../../common/components/title/Title";
import s from './PackHeader.module.scss'
import {Button} from "../../button/Button";
import {Modal} from "@mui/material";
import {ModalBox} from "../../../utils/styled-components/StyledComponents";
import {AddNewPack} from "../../modal/pack-modal/AddNewPack";


export const PackHeader: FC = () => {
    const [isOpen, setOpen] = useState(false)

    return <div className={s.wrapper}>
        <Title title={'Packs list'}/>
        <Button className={s.btn} title={'Add new pack'} onClick={() => setOpen(true)}/>
        <Modal disableRestoreFocus open={isOpen} onClose={() => setOpen(false)}>
            <ModalBox>
                <AddNewPack setOpen={setOpen}/>
            </ModalBox>
        </Modal>
    </div>
};


