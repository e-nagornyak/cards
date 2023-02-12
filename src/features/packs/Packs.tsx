import React from 'react';
import {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import {SuperTableHead} from "../table/SuperTableHead";
import {FilterPanel} from "./filter-panel/FilterPanel";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchPacksTC} from "./Packs-reducer";
import {SuperTableBody} from "../table/SuperTableBody";
import {SuperPagination} from "../table/SuperPagination";
import {changePage, changePageCount, setSortPacks} from "./filter-panel/Filter-panel-reducer";

export type namePacksType = 'name' | 'cardsCount' | 'updated' | 'user_name' | 'actions'
export type columnsPacksType = { id: namePacksType, label: string, sort: boolean }

const packsColumns: columnsPacksType[] = [
    {id: 'name', label: 'Name', sort: true},
    {id: 'cardsCount', label: 'Cards', sort: true},
    {id: 'updated', label: 'Last Updated', sort: true},
    {id: 'user_name', label: 'Created by', sort: true},
    {id: 'actions', label: 'Actions', sort: false},
]

export const Packs = () => {
    console.log('Packs rendering')
    const dispatch = useAppDispatch()
    const cardPacksTotalCount = useAppSelector(state => state.packsFilter.cardPacksTotalCount)
    const page = useAppSelector(state => state.packsFilter.page)
    const pageCount = useAppSelector(state => state.packsFilter.pageCount)
    const packs = useAppSelector(state => state.packs)
    const search = useAppSelector(state => state.packsFilter.packName)
    const isMyPacks = useAppSelector(state => state.packsFilter.isMyPacks)
    const sort = useAppSelector(state => state.packsFilter.sortPacks)

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
    }, [page, pageCount, search, isMyPacks, sort])

    return <>
        <FilterPanel/>
        <Paper sx={{width: '80%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <SuperTableHead changeSort={sorColumnsHandler} columns={packsColumns}/>
                    <SuperTableBody columns={packsColumns} rows={packs}/>
                </Table>
            </TableContainer>
        </Paper>
        <SuperPagination
            page={page}
            pageCount={pageCount}
            totalCount={cardPacksTotalCount}
            rowsPerPageOptions={[4, 10, 25]}
            onPageChange={changePageHandler}
            onRowsPerPageChange={changeRowsPerPageHandler}
        />
    </>
}


