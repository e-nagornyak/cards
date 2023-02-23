import React, {memo} from 'react';
import empty from "../../assets/empty.png";

export const Empty = memo(() => {
    return <>
        <h1>Nothing found</h1>
        <img style={{width: '25vw'}} src={empty} alt={'empty'}/>
    </>
})

