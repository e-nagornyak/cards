import React, {FC, useState} from "react";
import arrow from "../../../assets/image/sort-arrow.png";
import s from './TableHead.module.scss'
import {useAppSelector} from "../../../hooks/hooks";

type PropsType = {
    sortId: string
    label: string,
    isSort: boolean
    changeSort: (sort: string) => void
}

export const TableHead: FC<PropsType> = ({isSort, sortId, changeSort, label}) => {
    const [sort, setSort] = useState<0 | 1>(0)
    const status = useAppSelector(state => state.app.status)
    const onClickHandler = () => {
        if (isSort) {
            changeSort(`${sort}${sortId}`)
            setSort(sort ? 0 : 1)
        }
    }

    return <th className={s.head_th}>
        <span>{label}</span>
        {isSort &&
            <button onClick={onClickHandler} className={s.btn} disabled={status === 'loading'}>
                <img className={s.arrow}
                     style={{transform: `rotate(${sort ? '0deg' : '180deg'})`}}
                     src={arrow}
                     alt="sort arrow"/>
            </button>

        }
    </th>
}