import React, {ChangeEvent, useEffect} from 'react';
import Button from "@mui/material/Button";
import {Slider} from "@mui/material";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {changeMax, changeMin, changePrivate, changeSearchValue, fetchParamsTC} from "./Filter-panel-reducer";

export const FilterPanel = () => {
    const dispatch = useAppDispatch()
    const searchPackNameValue = useAppSelector(state => state.packsFilter.packName)
    const myPacks = useAppSelector(state => state.packsFilter.isMyPacks)
    const minValue = useAppSelector(state => state.packsFilter.min)
    const maxValue = useAppSelector(state => state.packsFilter.max)
    const rangeOptions = useAppSelector(state => state.packsFilter.rangeOptions)


    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchValue({packName: e.currentTarget.value}))
    }
    const clickMyHandler = () => {
        dispatch(changePrivate({isMyPacks: true}))
    }
    const clickAllHandler = () => {
        dispatch(changePrivate({isMyPacks: false}))
    }
    const changeValueHandler = (value: number[]) => {
        if (value[0] !== minValue) {
            dispatch(changeMin({min: value[0]}))
        }
        if (value[1] !== maxValue) {
            dispatch(changeMax({max: value[1]}))

        }
    }
    const resetParamsHandler = () => {
        // dispatch(resetParams())
    }


    useEffect(() => {
        dispatch(fetchParamsTC())
    }, [searchPackNameValue, myPacks, minValue, maxValue])

    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        gap: '20px',
        alignItems: 'flex-end',
        marginBottom: '10px'
    }}>
        <div>
            <h4>Search</h4>
            <input value={searchPackNameValue} onChange={searchHandler} type="text"/>
        </div>
        <div>
            <h4>Show packs cards</h4>
            <Button onClick={clickMyHandler} color={myPacks ? 'primary' : 'inherit'}
                    variant={"contained"}>My</Button>
            <Button onClick={clickAllHandler} color={!myPacks ? 'primary' : 'inherit'}
                    variant={"contained"}>All</Button>
        </div>
        <div>
            <h4>Number of cards</h4>
            <RangeSlider onChange={changeValueHandler} rangeOptions={rangeOptions} value={[minValue, maxValue]}/>
        </div>
        <div style={{border: '1px solid black'}}>
            <FilterAltOffIcon onClick={resetParamsHandler} cursor={'pointer'}/>
        </div>
    </div>

};

type RangeSliderPropsType = {
    value: [min: number, max: number]
    onChange: (value: number[]) => void
    rangeOptions: number

}
const RangeSlider = ({rangeOptions, value, onChange}: RangeSliderPropsType) => {


    const handleChange = (event: Event, newValue: number | number[]) => {
        onChange(newValue as number[])
    };


    return <div style={{width: '300px', display: 'flex', gap: '10px'}}>
        <span style={{padding: '5px', border: '1px solid black'}}>{value[0]}</span>
        <Slider
            max={rangeOptions}
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
        />
        <span style={{padding: '5px', border: '1px solid black'}}>{value[1]}</span>

    </div>
}