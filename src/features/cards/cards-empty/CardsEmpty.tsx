import React, {FC, useState} from 'react';
import s from "../Cards.module.scss";
import {Button} from "../../button/Button";
import {Modal} from "@mui/material";
import {ModalBox} from "../../../utils/styled-components/StyledComponents";
import {AddNewCard} from "../../modal/card-modal/AddNewCard";

export const CardsEmpty: FC = () => {
    const [isOpen, setOpen] = useState(false)


    return <div className={s.empty}>
        <h2>This pack is empty. Click add new card to fill this pack</h2>
        <Button title={'Add new cards'} className={s.empty_btn} onClick={() => setOpen(true)}/>
        <Modal disableRestoreFocus open={isOpen} onClose={() => setOpen(false)}>
            <ModalBox>
                <AddNewCard setOpen={setOpen}/>
            </ModalBox>
        </Modal>

    </div>
};

