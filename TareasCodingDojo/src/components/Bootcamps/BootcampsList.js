import React, { useEffect, useState } from 'react';
import {Link,navigate} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';
import { UpdateIdButton } from '../Utils/UpdateIdButton';

export const BootcampsList = ({isAdmin}) => {
    const [bootcamps, setBootcamps] = useState({});
    const [errors, setErrors] = useState('');
    const [updateId, setUpdateId] = useState('');

    useEffect(() => {
        if (!isAdmin) {
            navigate("/home");
            return;
        }
    
        const getData = () => {
            FirebaseUtil.getBootcamps()
              .then(response => {
                  if (typeof(response) === "object") {
                      setErrors('');
                      setBootcamps(response);
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
        <h2 className="text-center">Lista de Cursos</h2>
        <Link to="/bootcamps/new" className="btn btn-primary">Nuevo</Link>
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
                    <th className="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {bootcamps && Object.keys(bootcamps).map((keyName,i) => 
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><Link to={"/bootcamps/"+ keyName}>{keyName}</Link></td>
                    <td>{bootcamps[keyName].code}</td>
                    <td>{bootcamps[keyName].name}</td>
                    <td><input type="checkbox" checked={bootcamps[keyName].active} onChange={() => false} /></td>
                    <td><DeleteButton id={keyName} collection={"bootcamps"} setDeleteId={setUpdateId}/>
                     <UpdateIdButton id={keyName} collection={"bootcamps"} setUpdateId={setUpdateId}/>
                    </td>
                </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}
