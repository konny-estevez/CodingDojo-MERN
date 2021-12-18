import { styled } from 'styletron-react';
 
const StyledBox2 = styled('div', props => ({
    border: '1px solid lightgray',
    background: props.$bgColor,
    width: props.$width || '100px',
    height: props.$height || '100px',
 
    display: 'block',
 
    ['@media and (min-width: ' + (props.$minWidth || '500px') + ')']: {
        display: 'none'
    }
}));

export default StyledBox2;