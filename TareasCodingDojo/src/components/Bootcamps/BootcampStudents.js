import React, { useEffect, useState } from 'react';
import { FirebaseUtil } from '../Utils/Firebase.Util';

export const BootcampStudents = ({bootcampId}) => {
    const [students, setStudents] = useState([]);
    const [errors, setErrors] = useState('');
    const [selected, setSelected] = useState('');
    const [bootcampStudents, setBootcampStudents] = useState([]);

    useEffect(() => {
        let selectedStudents = [];
        FirebaseUtil.getBootcampStudents(bootcampId)
            .then(response => {
                if (response) {
                    setBootcampStudents(response);
                    selectedStudents = response;
                }
            })
            .catch(error => setErrors(error));
            FirebaseUtil.getStudents()
            .then(response => {
                let temp = Object.keys(response).map((key) => {
                    return {
                        id: key,
                        name: response[key].name,
                    };
                });
                const selectedIds = selectedStudents.map(item => item.id);
                temp = temp.filter((item) => !selectedIds.includes(item.id));
                temp.sort((a,b) => {
                    if (a.name < b.name)
                        return -1;
                    else if (a.name > b.name)
                        return 1;
                    else 
                        return 0;
                })
                setStudents(temp);
            })
            .catch(error => setErrors(error));
    }, [bootcampId]);

    const handleChange = (e) => {
        setSelected(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selected !== '') {
            let selectedItem = students.filter(item => item.id === selected);
            if (selectedItem.length > 0) {
                setErrors('');
                let temp = [...bootcampStudents, selectedItem[0]];
                FirebaseUtil.updateBootcampStudents(bootcampId,temp);
                setBootcampStudents(temp);
                setStudents(students.filter(item => item.id !== selected));
                setSelected('');
            }
        }
        else {
            setErrors("Debes seleccionar un estudiante para agregar.");
        }
    }

    const handleClear = (e) => {
        if (window.confirm("Estás seguro que deseas eliminar los estudiantes del curso?")) {
            FirebaseUtil.updateBootcampStudents(bootcampId,null);
            setBootcampStudents([]);
        }
    }

  return (
    <div>
        <h2>Estudiantes del Bootcamp</h2>
        <br/>
        <form onSubmit={handleSubmit} >
            <div className="row">
                <div className="col-md-4 col-md-offset-3">
                    <select className="form-control" name="students" onChange={handleChange} value={selected}>
                        <option value="" >[Selecciona una opción]</option>
                        { students && students.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                    </select>
                  {!errors ? '' : <div className="text-danger">{errors}</div> }
                </div>
                <div className="col-md-1" >
                    <button type="submit" className="btn btn-primary">Agregar</button>
                </div>
                <div className="col-md-1">
                    <button type="button" className="btn btn-danger" onClick={handleClear}>Limpiar</button>
                </div>
                <div className="col-md-1">
                </div>
                <div className="col-md-4 text-start">
                    <ol>
                        {bootcampStudents && bootcampStudents.map((item,i) => <li key={i}>{item.name}</li>)}
                    </ol>
                </div>
            </div>
        </form>
    </div>
  )
}
