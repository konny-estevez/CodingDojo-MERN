import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';
import { UpdateIdButton } from '../Utils/UpdateIdButton';

export const StudentsList = ({user}) => {
    const [students, setStudents] = useState({});
    const [errors, setErrors] = useState('');
    const [updateId, setUpdateId] = useState('');

    useEffect(() => {
      const getData = async () => {
          await FirebaseUtil.getStudents()
            .then(response => {
                if (typeof(response) === "object") {
                    setErrors('');
                    setStudents(response);
                }
                else {
                    setErrors(response);
                }
            })
            .catch(error => setErrors(error));
        }
        getData();
    }, [updateId]);
    
  return (
    <div>
        <br/>
        <Link to="/students/new" className="btn btn-primary">Nuevo</Link>
        <br/>
        <h2 className="text-center">Lista de Estudiantes</h2>
        {!errors ? '' : <div className="text-danger">{errors}</div> }
        <table className="table table-striped">
            <thead>
                <tr>
                    <th className="text-center">No.</th>
                    <th className="text-center">Id</th>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Activo</th>
                    <th className="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {students && Object.keys(students).map((keyName,i) => 
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><Link to={"/students/"+ keyName}>{keyName}</Link></td>
                    <td>{students[keyName].name}</td>
                    <td>{students[keyName].email}</td>
                    <td><input type="checkbox" checked={students[keyName].active} onChange={() => false} /></td>
                    <td><DeleteButton id={keyName} collection={"students"} setDeleteId={setUpdateId}/>
                        <UpdateIdButton id={keyName} collection={"students"} setUpdateId={setUpdateId}/>
                    </td>
                </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}
