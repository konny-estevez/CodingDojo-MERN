import React, {useState} from 'react'
import AppContext from '../context/Context';

export const Wrapper = (props) => {
    const [username, setUsername] = useState('');

    return (
        <AppContext.Provider value={{username, setUsername}}>
            {props.children}
        </AppContext.Provider>
    )
}
