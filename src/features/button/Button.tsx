import React, {FC} from 'react';

type PropsType = {
    className?: string
    title: string
    disabled?: boolean
    onClick: () => void
}

export const Button: FC<PropsType> = ({className,title, onClick, disabled}) => {
    return <button className={className} disabled={disabled} onClick={onClick}>{title}</button>
};

