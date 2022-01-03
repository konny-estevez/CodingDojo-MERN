import React from 'react'
import { StyledBox } from './StyledBox';

export const WordComponent = ({ word, color1, color2 }) => {
    return (
        <div>
            <StyledBox color1={color1} color2={color2}>
                <h1>The word is: {word}</h1>
            </StyledBox>
        </div>
    )
}
