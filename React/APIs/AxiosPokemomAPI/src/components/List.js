import React from 'react'

export const List = ({list}) => {
    return (
        <div>
            <ol>
            {
                list.map((item, i) => <li key={i}>{item}</li>)
            }
            </ol>
        </div>
    )
}
