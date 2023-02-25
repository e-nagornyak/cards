import React, {FC} from 'react';
import {CardModal} from "./CardModal";

type PropsType = {
    setOpen: (isOpen: boolean) => void
}

export const AddNewCard: FC<PropsType> = ({setOpen}) => {


    return <CardModal
        title={'Ad new card'}
        onClose={setOpen}
        selectorValue={'any'}
        answerValue={'Answer'}
        questionValue={'Question'}
        questionOnChange={() => {
        }}
        answerOnChange={() => {
        }}
        selectorOnChange={() => {
        }}
    />
};

