import React from 'react';
import StyledBox from './StyledBox';
import StyledBox2 from './StyledBox2';
 
const OtherComponent = () => (
    <div>
        <StyledBox bgColor="blue"/>
        <StyledBox bgColor="red" height="200px"/>
        <StyledBox2 $bgColor="yellow"/>
        <StyledBox2 $bgColor="green" $height="300px" $minWidth="1200"/>
    </div>
)
 
export default OtherComponent;