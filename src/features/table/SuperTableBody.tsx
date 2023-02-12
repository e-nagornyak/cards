import {FC} from "react";
import {columnsPacksType} from "../packs/Packs";
import {columnsCardsType} from "./SuperTableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {NavLink} from "react-router-dom";

type SuperTableBodyType = {
    columns: columnsPacksType[] | columnsCardsType[]
    rows: any
}

export const SuperTableBody: FC<SuperTableBodyType> = ({rows, columns}) => {
    return <TableBody>
        {rows.map(((row: any) => {
            return <TableRow hover tabIndex={-1} key={row._id}>
                {columns.map((column) => {
                    const icons = row.private ? '3 svg' : '1 svg'
                    const link = column.id === 'name'
                        ? <NavLink to={'/pack-list'}>{row[column.id]}</NavLink>
                        : column.id === 'actions' ? icons : row[column.id]

                    return (
                        <TableCell key={column.id} align="left">
                            {link}
                        </TableCell>
                    )
                })}
            </TableRow>
        }))}
    </TableBody>
}

