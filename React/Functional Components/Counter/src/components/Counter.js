import React, {useState} from 'react'

export const Counter = (props) => {
    const [state, setState] = useState({
        clickCount: 0,
        clickCount2: 5,
    });
    
    const handleClick = () => {
        setState({
            clickCount: state.clickCount + 1
        });
    }
 
    return (
        <div>
            { state.clickCount }<br/>
            <button onClick={ handleClick }>Click Me</button>
        </div>
    );
}
