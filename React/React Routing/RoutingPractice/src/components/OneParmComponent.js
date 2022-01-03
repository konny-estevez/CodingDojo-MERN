import React from 'react'

export const OneParmComponent = ({parm1}) => {
    return (
        <div>
            { !isNaN(parm1) ? <h1>The number is: {parm1}</h1> 
                :  <h1>The word is: {parm1}</h1>}
        </div>
    )
}
