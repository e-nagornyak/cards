import React, {FC, useState} from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableHead from "@mui/material/TableHead";
import {columnsPacksType} from "../packs/Packs";


export type nameCardsType = 'question' | 'answer' | 'lastUpdate' | 'grade' | ''
export type columnsCardsType = { id: nameCardsType, label: string, sort: boolean }


type SuperTableHeadPropsType = {
    columns: columnsPacksType[] | columnsCardsType[]
    changeSort: (sort: string) => void
}

export const SuperTableHead: FC<SuperTableHeadPropsType> = ({columns, changeSort}) => {
    const [sortDirection, setSortDirection] = useState<0 | 1>(0)
    const sortHandler = (id: string) => {
        changeSort(`${sortDirection}${id}`)
    }

    return <TableHead>
        <TableRow>
            {columns.map((el) => {
                    const onClickHandler = () => {
                        if (el.sort) {
                            sortHandler(el.id)
                        }
                    }

                    return <TableCell
                        key={el.id}
                        onClick={onClickHandler}
                    >
                        <TableSortLabel
                            onClick={() => setSortDirection(sortDirection ? 0 : 1)}
                            direction={sortDirection ? 'asc' : 'desc'}
                            hideSortIcon={!el.sort}
                        >
                            {el.label}
                        </TableSortLabel>
                    </TableCell>
                }
            )}
        </TableRow>
    </TableHead>
};
