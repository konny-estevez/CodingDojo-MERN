import React, { useEffect, useState } from 'react';
import {Link,navigate} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';
import { UpdateIdButton } from '../Utils/UpdateIdButton';

export const StudentsList = ({isAdmin}) => {
    const [students, setStudents] = useState([]);
    const [errors, setErrors] = useState('');
    const [updateId, setUpdateId] = useState('');

    useEffect(() => {
        if (!isAdmin) {
            navigate("/home");
            return;
        }
    
          const getData = async () => {
          await FirebaseUtil.getStudents()
            .then(response => {
                if (typeof(response) === "object") {
                    setErrors('');
                    let temp = [];
                    Object.keys(response).map((keyName,i) => {
                        response[keyName].id = keyName;
                        temp = [...temp, response[keyName]];
                    });
                    temp.sort((a,b) => {
                        if (a.name > b.name)
                            return 1;
                        else if (a.name < b.name)
                            return -1;
                        else 
                            return 0;
                    });
                    setStudents(temp);
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
                    <th className="text-center" width="10%">Fecha Actualización</th>
                    <th className="text-center">Activo</th>
                    <th className="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {students && students.map((item,i) => 
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><Link to={"/students/"+ item.id}>{item.id}</Link></td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.createdAt ? item.createdAt.substring(0,10) : ''}</td>
                    <td><input type="checkbox" checked={item.active} onChange={() => false} /></td>
                    <td><DeleteButton id={item.id} collection={"students"} setDeleteId={setUpdateId}/>
                        <UpdateIdButton id={item.id} collection={"students"} setUpdateId={setUpdateId}/>
                    </td>
                </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}
