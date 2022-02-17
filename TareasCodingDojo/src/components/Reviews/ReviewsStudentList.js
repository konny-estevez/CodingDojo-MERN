import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';

export const ReviewsStudentList = ({studentId}) => {
    const [reviews, setReviews] = useState({});
    const [errors, setErrors] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [bootcamps, setBootcamps] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [student, setStudent] = useState('');

    useEffect(() => {
        const getData = async () => {
            await FirebaseUtil.getReviews(studentId)
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
              result = await FirebaseUtil.getStudent(studentId);
              setStudent(result);
          }
          getData();
      }, [updateId]);

    return (
        <div>
        <br/>
        <h2 className="text-center">Lista de Revisiones</h2>
        {!errors ? '' : <div className="text-danger">{errors}</div> }
        <table className="table table-striped">
            <thead>
                <tr>
                    <th className="text-center">No.</th>
                    <th className="text-center">Id</th>
                    <th className="text-center">Bootcamp</th>
                    <th className="text-center">Tarea</th>
                    <th className="text-center">Completada</th>
                    <th className="text-center">Fecha Creación</th>
                    <th className="text-center">Fecha Actualización</th>
                </tr>
            </thead>
            <tbody>
                {reviews && Object.keys(reviews).map((keyName,i) => 
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><Link to={`/reviews/student/${studentId}/${keyName}`}>{keyName}</Link></td>
                    <td>{bootcamps.length > 0 && bootcamps.find(item => item.id === reviews[keyName].bootcampId).name}</td>
                    <td>{tasks.length > 0 && tasks.find(item => item.id === reviews[keyName].taskId).name}</td>
                    <td className="text-center"><input type="checkbox" checked={reviews[keyName].taskCompleted} onChange={() => false} /></td>
                    <td>{reviews[keyName].createdAt.substring(0,10)}</td>
                    <td>{reviews[keyName].updatedAt ? reviews[keyName].updatedAt.substring(0,10) : ''}</td>
                </tr>)
                }
            </tbody>
        </table>
        </div>
      )
}
