import React, { useEffect, useState } from 'react';
import {Link,navigate} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';
import { UpdateIdButton } from '../Utils/UpdateIdButton';

export const TasksList = ({isAdmin}) => {
    const [tasks, setTasks] = useState({});
    const [errors, setErrors] = useState('');
    const [updateId, setUpdateId] = useState('');

    useEffect(() => {
        if (!isAdmin) {
            navigate("/home");
            return;
          }

        const getData = async () => {
            await FirebaseUtil.getTasks()
              .then(response => {
                  if (typeof(response) === "object") {
                      setErrors('');
                      setTasks(response);
                  }
                  else {
                      setErrors(response);
                  }
              })
              .catch(error => setErrors(error));
          }
          getData();
      }, [updateId,isAdmin]);
      
    return (
        <div>
        <h2 className="text-center">Lista de Tareas</h2>
        <Link to="/tasks/new" className="btn btn-primary">Nuevo</Link>
        <br/>
        {!errors ? '' : <div className="text-danger">{errors}</div> }
        <table className="table table-striped">
            <thead>
                <tr>
                    <th className="text-center">No.</th>
                    <th className="text-center">Id</th>
                    <th className="text-center">Código</th>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Activo</th>
                    <th className="text-center">Url</th>
                    <th className="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tasks && Object.keys(tasks).map((keyName,i) => 
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><Link to={"/tasks/"+ keyName}>{keyName}</Link></td>
                    <td>{tasks[keyName].code}</td>
                    <td>{tasks[keyName].name}</td>
                    <td><input type="checkbox" checked={tasks[keyName].active} onChange={() => false} /></td>
                    <td>{tasks[keyName].url ? <a href={tasks[keyName].url} target="_blank" rel="noreferrer">Enlace Contenido</a> : ''}</td>
                    <td><DeleteButton id={keyName} collection={"tasks"} setDeleteId={setUpdateId}/> 
                        <UpdateIdButton id={keyName} collection={"tasks"} setUpdateId={setUpdateId}/>
                    </td>
                </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}
