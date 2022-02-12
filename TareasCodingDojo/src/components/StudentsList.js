import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import {FirebaseUtil} from './Firebase.Util';
import './styles.css';

export const StudentsList = ({user}) => {
    const [students, setStudents] = useState([]);
    const [errors, setErrors] = useState('');

    useEffect(() => {
      const getData = async () => {
          await FirebaseUtil.getStudents()
            .then(response => {
                if (Array.isArray(response)) {
                    setStudents(response);
                }
                else {
                    setErrors(response);
                }
            })
            .catch(error => setErrors(error));
        }
        getData();
    }, [])
    
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
                </tr>
            </thead>
            <tbody>
                {students && students.map((student, i) => <tr key={i}>
                    <td>{i+1}</td>
                    <td><Link to={"/students/"+ student.id}>{student.id}</Link></td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td><input type="checkbox" checked={student.active} onChange={() => false} /></td>
                </tr>)}
            </tbody>
        </table>
    </div>
  )
}
