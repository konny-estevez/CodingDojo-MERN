import React, { useState } from 'react'
import ValidColors from './colors'

export const Form = ({onNewColor}) => {
    const [color, setColor] = useState('');
    const [error, setError] = useState('');
    
    const handleColor = e => {
        setColor(e.target.value);
        if (e.target.value.length > 0 && e.target.value.length < 3)
            setError('Color must be at least 3 characters');
        else
            setError('');
    }

    const onSubmit = event => {
        event.preventDefault();
        if (ValidColors.hasOwnProperty(color.toLowerCase())) {
            if (color.length === 0)
                setError('Color must be at least 3 characters');
            else if (color.length > 2) {
                onNewColor(color);
                setColor('');
                setError('');
            }
        }
        else {
            setError('That is not a valid color');
        }
    }

    return (
        <div>
            <br/>
            <form onSubmit={onSubmit}>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Color: </span>
                    <input type="text" className="form-control" onChange={ handleColor } value={color}/>
                    <input type="submit" className="btn btn-primary" value="Add" />
                </div>
                {
                    !error ? '' :
                    <p style={{color:'red'}}>{ error }</p>
                }
            </form>
        </div>
    )
}
