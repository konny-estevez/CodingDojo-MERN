import React, { useEffect, useState } from 'react';
import { FirebaseUtil } from '../Utils/Firebase.Util';

export const BootcampTasks = ({bootcampId}) => {
    const [tasks, setTasks] = useState([]);
    const [errors, setErrors] = useState('');
    const [selected, setSelected] = useState('');
    const [bootcampTasks, setBootcampTasks] = useState([]);

    useEffect(() => {
        let selectedStudents = [];
        FirebaseUtil.getBootcampTasks(bootcampId)
            .then(response => {
                setBootcampTasks(response);
                selectedStudents = response;
            })
            .catch(error => setErrors(error));
        FirebaseUtil.getTasks()
            .then(response => {
                let temp = [];
                Object.keys(response).map((key) => 
                    temp = [...temp, {
                        id: key,
                        name: response[key].name,
                    }]);
                    const selectedIds = selectedStudents.map(item => item.id);
                temp = temp.filter((item) => !selectedIds.includes(item.id));
                setTasks(temp);
            })
            .catch(error => setErrors(error));
    }, [bootcampId]);

    const handleChange = (e) => {
        setSelected(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selected !== '') {
            let selectedItem = tasks.filter(item => item.id === selected);
            if (selectedItem.length > 0) {
                setErrors('');
                let temp = [...bootcampTasks, selectedItem[0]];
                FirebaseUtil.updateBootcampTasks(bootcampId,temp);
                setBootcampTasks(temp);
                setTasks(tasks.filter(item => item.id !== selected));
                setSelected('');
            }
        }
        else {
            setErrors("Debes seleccionar una tarea para agregar.");
        }
    }

  return (
    <div>
        <h2>Tareas del Bootcamp</h2>
        <br/>
        <form onSubmit={handleSubmit} >
            <div className="row">
                <div className="col-md-4 col-md-offset-3">
                    <select className="form-control" name="students" onChange={handleChange} value={selected}>
                        <option value="" >[Selecciona una opción]</option>
                        {tasks.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                    </select>
                  {!errors ? '' : <div className="text-danger">{errors}</div> }
                </div>
                <div className="col-md-1" >
                    <button type="submit" className="btn btn-primary">Agregar</button>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-4 text-start">
                    <ol>
                        {bootcampTasks.map((item,i) => <li key={i}>{item.name}</li>)}
                    </ol>
                </div>
            </div>
        </form>
    </div>
  )
}
