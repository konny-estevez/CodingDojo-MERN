import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';
import { UpdateIdButton } from '../Utils/UpdateIdButton';

export const ReviewsList = ({user}) => {
    const [reviews, setReviews] = useState({});
    const [errors, setErrors] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [bootcamps, setBootcamps] = useState([]);
    const [students, setStudents] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      const getData = async () => {
          await FirebaseUtil.getReviews()
            .then(response => {
                if (typeof(response) === "object") {
                    setErrors('');
                    setReviews(response);
                }
                else {
                    setErrors(response);
                }
            })
            .catch(error => setErrors(error));
            let result = await FirebaseUtil.getBootcamps();
            let temp = [];
            Object.keys(result).map(key => {
                temp = [...temp, {id: key, name: result[key].name}];
            });
            setBootcamps(temp);
            result = await FirebaseUtil.getTasks();
            temp = [];
            Object.keys(result).map(key => {
                temp = [...temp, {id: key, name: result[key].name}];
            });
            setTasks(temp);
            result = await FirebaseUtil.getStudents();
            temp = [];
            Object.keys(result).map(key => {
                temp = [...temp, {id: key, name: result[key].name}];
            });
            setStudents(temp);
        }
        getData();
    }, [updateId]);
    
    return (
    <div>
    <br/>
    <Link to="/reviews/new" className="btn btn-primary">Nuevo</Link>
    <br/>
    <h2 className="text-center">Lista de Revisiones</h2>
    {!errors ? '' : <div className="text-danger">{errors}</div> }
    {//JSON.stringify(students)
    }
    <table className="table table-striped">
        <thead>
            <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Id</th>
                <th className="text-center">Bootcamp</th>
                <th className="text-center">Estudiante</th>
                <th className="text-center">Tarea</th>
                <th className="text-center">Completada</th>
                <th className="text-center">Fecha Creación</th>
                <th className="text-center">Acciones</th>
            </tr>
        </thead>
        <tbody>
            {reviews && Object.keys(reviews).map((keyName,i) => 
              <tr key={i}>
                <td>{i+1}</td>
                <td><Link to={"/reviews/"+ keyName}>{keyName}</Link></td>
                <td>{bootcamps.length > 0 && bootcamps.find(item => item.id === reviews[keyName].bootcampId).name}</td>
                <td>{students.length > 0 && students.find(item => item.id === reviews[keyName].studentId).name}</td>
                <td>{tasks.length > 0 && tasks.find(item => item.id === reviews[keyName].taskId).name}</td>
                <td className="text-center"><input type="checkbox" checked={reviews[keyName].taskCompleted} onChange={() => false} /></td>
                <td>{reviews[keyName].createdAt.substring(0,10)}</td>
                <td><DeleteButton id={keyName} collection={"reviews"} setDeleteId={setUpdateId} /> 
                    <UpdateIdButton id={keyName} collection={"reviews"} setUpdateId={setUpdateId}/>
                </td>
            </tr>)
            }
        </tbody>
    </table>
</div>
  )
}
