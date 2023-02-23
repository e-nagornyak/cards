import React, {useEffect} from 'react';
import {FilterPanel} from "./filter-panel/FilterPanel";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchPacksTC} from "./Packs-reducer";
import {SuperPagination} from "../table/pagination/SuperPagination";
import {changePage, changePageCount, setSortPacks} from "./filter-panel/Filter-panel-reducer";
import {NavLink} from "react-router-dom";
import styles from '../table/Table.module.scss'
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {TableHead} from "../table/table-head/TableHead";
import {PackHeader} from "./pack-header/PackHeader";
import s from './Packs.module.scss'
import {Empty} from "../empty/Empty";

export type ColumnsType = { id: string, label: string, sort: boolean, }
const packsColumns: ColumnsType[] = [
    {id: 'name', label: 'Name', sort: true},
    {id: 'cardsCount', label: 'Cards', sort: true},
    {id: 'updated', label: 'Last Updated', sort: true},
    {id: 'user_name', label: 'Created by', sort: true},
    {id: 'actions', label: 'Actions', sort: false},
]

export const Packs = () => {
    const dispatch = useAppDispatch()
    // params
    const cardPacksTotalCount = useAppSelector(state => state.packsParams.cardPacksTotalCount)
    const page = useAppSelector(state => state.packsParams.page)
    const pageCount = useAppSelector(state => state.packsParams.pageCount)
    const isMyPacks = useAppSelector(state => state.packsParams.isMyPacks)
    const max = useAppSelector(state => state.packsParams.max)
    const min = useAppSelector(state => state.packsParams.min)
    const sort = useAppSelector(state => state.packsParams.sortPacks)
    const search = useAppSelector(state => state.packsParams.packName)
    // packs
    const packs = useAppSelector(state => state.packs)

    const changePageHandler = (event: unknown, newPage: number) => {
        dispatch(changePage({page: newPage + 1}))
    };

    const changeRowsPerPageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changePageCount({pageCount: +event.target.value}))
    };

    const sorColumnsHandler = (sort: string) => {
        dispatch(setSortPacks({sort}))
    }

    useEffect(() => {
        dispatch(fetchPacksTC())
    }, [isMyPacks, page, pageCount, max, min, sort, search])

    return <>
        <PackHeader/>
        <FilterPanel/>
        <table className={styles.tableWithGrid}>
            <thead>
            <tr>
                {packsColumns.map(p => <TableHead
                    sortId={p.id}
                    key={p.id}
                    label={p.label}
                    isSort={p.sort}
                    changeSort={sorColumnsHandler}/>)}
            </tr>
            </thead>
            <tbody>
            {packs.map(p => <tr key={p._id}>
                <td data-label="Name"><NavLink to={`/cards/${p._id}`}>{p.name}</NavLink></td>
                <td data-label="Cards">{p.cardsCount}</td>
                <td data-label="Last Updated">{p.updated.slice(0, 10)}</td>
                <td data-label="Created by">{p.user_name}</td>
                <td data-label="Actions">
                    <IconButton disabled={p.cardsCount === 0}>
                        <SchoolIcon fontSize={'small'}/>
                    </IconButton>
                    {p.private && <>
                        <IconButton onClick={() => alert('change name')}>
                            <EditIcon fontSize={'small'}/>
                        </IconButton>
                        <IconButton onClick={() => alert('delete')}>
                            <DeleteOutlineIcon fontSize={'small'}/>
                        </IconButton>
                    </>}
                </td>
            </tr>)}
            </tbody>
        </table>
        {!packs.length && <>
           <Empty/>
        </>}
        <SuperPagination
            className={s.pagination}
            page={page}
            pageCount={pageCount}
            totalCount={cardPacksTotalCount}
            rowsPerPageOptions={[5, 10, 15]}
            onPageChange={changePageHandler}
            onRowsPerPageChange={changeRowsPerPageHandler}
        />
    </>
}