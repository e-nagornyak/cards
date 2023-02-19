import React, {FC, useEffect} from 'react';
import Table from '@mui/material/Table';
import {SuperTableHead} from '../table/SuperTableHead';
import {SuperTableBody} from '../table/SuperTableBody';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchFriendsPacksTC} from './friends-packs-reducer';
import {useParams} from 'react-router-dom';
import {changeSortCards} from './firends-params-reducer';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

type FriendsPacksType = {}
export type NameCardsType = 'question' | 'answer' | 'updated' | 'grade'
export type ColumnsCardsType = { id: NameCardsType, label: string, sort: boolean }

const cardsColumns: ColumnsCardsType[] = [
    {id: 'question', label: 'Question', sort: true},
    {id: 'answer', label: 'Answer', sort: true},
    {id: 'updated', label: 'Last Updated', sort: true},
    {id: 'grade', label: 'Grade', sort: true},

]
const FriendsPacks: FC<FriendsPacksType> = ({}) => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    const sort = useAppSelector(state => state.params.sortCards)
    const {packId} = useParams<{ packId: string }>()
    console.log(cards);
    const sortColumnsHandler = (sort: string) => {
        dispatch(changeSortCards({sortCards: sort}))
    }
    useEffect(() => {
        dispatch(fetchFriendsPacksTC(packId))
    }, [sort])
    return (
        <Paper sx={{width: '80%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <SuperTableHead changeSort={sortColumnsHandler} columns={cardsColumns}/>
                    <SuperTableBody columns={cardsColumns} rows={cards}/>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default FriendsPacks;