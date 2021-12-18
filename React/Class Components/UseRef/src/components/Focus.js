import React, { useRef } from 'react';

export const Focus = () => {
    const input = useRef();
 
    function focusInput() {
        input.current.focus();
    }
 
    return (
        <>
            <input type="text" />
            <input ref={input}/>
            <button onClick={focusInput}>Focus Me!</button>
        </>
    );
}
