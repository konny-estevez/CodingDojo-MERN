import React, { useState } from 'react'

export const TodoForm = ({onNewTask}) => {
    const [task, setTask] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (task.length > 0 && error.length === 0) {
            onNewTask(task);
            setTask('');
        }
        else 
            setError('Invalid task');
    }

    const handleChange = (e) => {
        setTask(e.target.value);
        if (e.target.value.length > 0 && e.target.value.length < 4)
            setError('Task name must be at least 4 characters.');
        else 
            setError('');
    }

    return (
        <div>
            <br/>
            <form onSubmit={onSubmit}>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">New Task: </span>
                    <input type="text" className="form-control" onChange={ handleChange } value={ task }/>
                    <button type='submit' className="btn btn-primary" >Add Task</button>
                </div>
                {
                    !error ? '' :
                    <p style={{color:'red'}}>{ error }</p>
                }
            </form>
            <br/>
        </div>
    )
}
