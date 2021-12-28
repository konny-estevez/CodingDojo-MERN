import React from 'react'

export const TodoList = ({todoList,onDeleteTask,onCompleteTask}) => {
    const handleCheckBox = (e, item) => {
        onCompleteTask(item.id, item.name, e.target.checked);
    }

    return (
        <div>
            <h1>Todo List</h1>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    todoList.map((item, i) => 
                        <tr key={i} >
                            <td>{item.name}</td>
                            <td><input type="checkbox" checked={item.completed} onChange={e => handleCheckBox(e, item)}/></td>
                            <td><button type="button" className="btn btn-danger" onClick={e => onDeleteTask(item.id)} >Delete</button></td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}
