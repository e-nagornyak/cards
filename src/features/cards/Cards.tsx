import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchCards} from "./cards-reducer";
import {
    changeCardPage,
    changeCardPageCount,
    changeSortCards
} from "./cards-params-reducer";
import {SearchInput} from "../../common/components/search-input/SearchInput";
import {SuperPagination} from "../table/pagination/SuperPagination";
import SettingsIcon from '@mui/icons-material/Settings';
import {Rating} from "@mui/material";
import {ColumnsType} from "../packs/Packs";
import styles from "../table/Table.module.scss";
import s from './Cards.module.scss'
import {Title} from "../../common/components/title/Title";
import {TableHead} from "../table/table-head/TableHead";
import {BackPackList} from "../back-pack-list/BackPackList";
import {CardsEmpty} from "./cards-empty/CardsEmpty";
import {useDebounce} from "../../hooks/useDebounce";
import {Button} from "../button/Button";
import {CardActions} from "../card-actions/CardActions";

const cardsColumns: ColumnsType[] = [
    {id: 'question', label: 'Question', sort: true},
    {id: 'answer', label: 'Answer', sort: true},
    {id: 'updated', label: 'Last Updated', sort: true},
    {id: 'grade', label: 'Grade', sort: true},
    {id: 'actions', label: 'Actions', sort: false},
]

export const Cards: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {packId} = useParams<{ packId: string }>()

    const cards = useAppSelector(state => state.cards.cards)
    const packName = useAppSelector(state => state.cards.packName)
    // params
    const packPrivate = useAppSelector(state => state.cards.packPrivate)
    const page = useAppSelector(state => state.cardsParams.page)
    const pageCount = useAppSelector(state => state.cardsParams.pageCount)
    const sortCards = useAppSelector(state => state.cardsParams.sortCards)
    const cardsTotalCount = useAppSelector(state => state.cardsParams.cardsTotalCount)
    //input
    const [value, setValue] = useState('')
    const debounceValue = useDebounce(value, 750)
    const inputOnChange = (value: string) => setValue(value)

    const sortColumnsHandler = (sort: string) => {
        dispatch(changeSortCards({sortCards: sort}))
    }
    const changePageHandler = (event: unknown, newPage: number) => {
        dispatch(changeCardPage({page: newPage + 1}))
    };

    const changeRowsPerPageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeCardPageCount({pageCount: +event.target.value}))
    };
    useEffect(() => {
        dispatch(fetchCards(packId))
    }, [page, pageCount, sortCards])


    return <div className={s.wrapper}>
        <div className={s.name_wrapper}>
            <BackPackList className={s.back_to_list}/>
            <div className={s.card_setting}>
                <Title title={packName}/>
                {packPrivate && <SettingsIcon/>}
            </div>
            {!!cards.length &&
                <Button
                    className={s.learn_btn}
                    title={'Learn to pack'}
                    onClick={() => navigate(`/learn-card/${packId}`)}
                />}
        </div>
        {cards.length
            ? <div className={s.table_wrapper}>
                <div className={s.search_panel}>
                    <span>Search</span>
                    <SearchInput fullWidth value={value} onChange={inputOnChange}/>
                </div>
                <table className={styles.tableWithGrid}>
                    <thead>
                    <tr>
                        {cardsColumns.map(c => <TableHead
                            sortId={c.id}
                            key={c.id}
                            label={c.label}
                            isSort={c.sort}
                            changeSort={sortColumnsHandler}/>)}
                    </tr>
                    </thead>
                    <tbody>
                    {cards.map(c => <tr key={c._id}>
                        <td data-label="Question">{c.question}</td>
                        <td data-label="Answer">{c.answer}</td>
                        <td data-label="Last Updated">{c.updated.slice(0, 10)}</td>
                        <td data-label="Grade">
                            <Rating readOnly value={c.grade}/>
                        </td>
                        <td data-label="CardActions">
                            <CardActions card={c}/>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
                <SuperPagination
                    page={page}
                    pageCount={pageCount}
                    totalCount={cardsTotalCount}
                    rowsPerPageOptions={[3, 5, 10, 15]}
                    onPageChange={changePageHandler}
                    onRowsPerPageChange={changeRowsPerPageHandler}
                />
            </div>
            : <CardsEmpty/>
        }
    </div>
};

