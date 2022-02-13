import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import {FirebaseUtil} from './Firebase.Util';
import './styles.css';
import { DeleteButton } from './DeleteButton';

export const StudentsList = ({user}) => {
    const [students, setStudents] = useState({});
    const [errors, setErrors] = useState('');
    const [deleteId, setDeleteId] = useState('');

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
    }, [deleteId]);
    
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
                    <th>No.</th>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Activo</th>
                    <th></th>
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
                    <td><DeleteButton id={keyName} collection={"students"} setDeleteId={setDeleteId}/></td>
                </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}
