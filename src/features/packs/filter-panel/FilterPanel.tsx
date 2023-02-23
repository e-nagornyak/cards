import React, {useEffect, useState} from 'react';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {changeMax, changeMin, changePrivate, changeSearchValue, resetParams} from "./Filter-panel-reducer";
import {Range} from "./range/Range";
import {SearchInput} from "../../../common/components/search-input/SearchInput";
import {useDebounce} from "../../../hooks/useDebounce";
import s from './FilterPanel.module.scss'
import {Button} from "../../button/Button";

export const FilterPanel = () => {
    const dispatch = useAppDispatch()
    const myPacks = useAppSelector(state => state.packsParams.isMyPacks)
    const minRange = useAppSelector(state => state.packsParams.minRange)
    const maxRange = useAppSelector(state => state.packsParams.maxRange)

    const [valueRange, setValueRange]  = useState([minRange, maxRange])

    useEffect(() => {
        setValueRange([minRange, maxRange]);
    },[minRange,maxRange])

    const resetParamsHandler = () => {
        setValue('')
        dispatch(resetParams())
        setValueRange([minRange, maxRange]);
    }

    // buttons
    const clickMyHandler = () => dispatch(changePrivate({isMyPacks: true}))
    const clickAllHandler = () => dispatch(changePrivate({isMyPacks: false}))

    // range
    const changeValueHandler = (value: number[]) => {
        setValueRange(value)
    }

    const onChangeCommitted  = (value: number[] ) => {
        dispatch(changeMin({min: value[0]}))
        dispatch(changeMax({max: value[1]}))
    }

    // search input
    const [value, setValue] = useState('')
    const debounceValue = useDebounce(value, 750)
    const inputOnChange = (value: string) => setValue(value)


    useEffect(() => {
        dispatch(changeSearchValue({packName: debounceValue}))
    }, [debounceValue])

    return <div className={s.wrapper}>
        <div className={s.filter_item}>
            <span>Search</span>
            <SearchInput className={s.input} value={value} onChange={inputOnChange}/>
        </div>
        <div className={`${s.filter_item} ${s.btn_group}`}>
            <span>Show packs cards</span>
            <div>
                <Button className={myPacks ? s.btn_active : ''} onClick={clickMyHandler} title={'My'}/>
                <Button className={!myPacks ? s.btn_active : ''} onClick={clickAllHandler} title={'All'}/>
            </div>
        </div>
        <div className={s.filter_item}>
            <span>Number of cards</span>
            <Range value={valueRange} max={maxRange} min={minRange} onChange={changeValueHandler} onChangeCommitted={onChangeCommitted}/>
        </div>
        <div className={s.filter_reset}>
            <FilterAltOffIcon onClick={resetParamsHandler} cursor={'pointer'}/>
        </div>
    </div>

};

