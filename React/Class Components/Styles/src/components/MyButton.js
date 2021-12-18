import React from 'react';
import styles from './MyButton.module.css';

const buttonStyles = {
    border: '0',
    padding: '12px 15px',
    background: 'black',
    fontSize: '1em',
    color: 'white',
    fontWeight: 'bold'
};

const handleClick = () => {
    alert("This button has been clicked!");
}

export default ({ children }) => (
    <button className={styles.myButton} onClick={ handleClick } >{children}</button>
)