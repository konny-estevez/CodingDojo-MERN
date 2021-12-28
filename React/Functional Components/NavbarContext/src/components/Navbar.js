import React, {useContext} from 'react'
import AppContext from '../context/Context';

export const Navbar = () => {
    const context = useContext(AppContext);

    const styles = {
        backgroundColor: "blueviolet",
        height: "5rem"
    }

    return (
        <nav className="navbar navbar-dark bg-purple" style={styles}> 
            <div className="container-fluid justify-content-end">
                <span className="navbar-brand mb-0 h1">Hi, {context.username}</span>
            </div>
            <br/>
        </nav>
    )
}
