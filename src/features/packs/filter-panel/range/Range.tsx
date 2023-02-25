import {Slider} from "@mui/material";
import React, {FC, memo} from "react";

type PropsType = {
    onChange: (value: number[]) => void
    onChangeCommitted: (value: number[]) => void
    value: number[]
    max: number,
    min: number
}

export const Range: FC<PropsType> = memo((
    {
        value,
        max,
        min,
        onChange,
        onChangeCommitted
    }) => {

    const onChangeHandler = (event: React.SyntheticEvent | Event, newValue: number | number[]) => onChange(newValue as number[])
    const onCommitted = (event: React.SyntheticEvent | Event, value: number | number[]) => onChangeCommitted(value as number[])

    return <div style={{width: '300px', display: 'flex', gap: '10px'}}>
        <span style={{textAlign: 'center', width: '25px', padding: '5px', border: '1px solid black'}}>{value[0]}</span>
        <Slider
            color={"secondary"}
            max={max}
            onChangeCommitted={onCommitted}
            min={min}
            onChange={onChangeHandler}
            value={value}
            valueLabelDisplay="auto"
        />
        <span style={{textAlign: 'center', width: '25px', padding: '5px', border: '1px solid black'}}>{value[1]}</span>
    </div>
})