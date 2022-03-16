import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import '../Utils/styles.css';
import {FirebaseUtil} from '../Utils/Firebase.Util';

export const ReviewsStudentList = ({studentId, isAdmin}) => {
    const [reviews, setReviews] = useState({});
    const [errors, setErrors] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [bootcamps, setBootcamps] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [student, setStudent] = useState('');
    const [bootcampId, setBootcampId] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
          getBootcamps();
          getTasks();
          if (!isAdmin) 
            getData();
      }, [updateId,isAdmin]);

      const getBootcamps = async () => {
        let result = await FirebaseUtil.getBootcamps();
        let temp = Object.keys(result).map(key => {
            return {id: key, name: result[key].name};
        });
        setBootcamps(temp);
      }

      const getTasks = async () => {
        let result = await FirebaseUtil.getTasks();
        let temp = Object.keys(result).map(key => {
            return {id: key, name: result[key].name};
        });
        setTasks(temp);
      }

      const getData = async (student) => {
        if (isAdmin && student) {
            studentId = student.id;
            isAdmin = false;
        }
        if (!isAdmin) {
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
            let result = await FirebaseUtil.getStudent(studentId);
            setStudent(result);
        }
      }

    const handleChange = async (e) => {
        let temp = [];
        switch (e.target.name) {
            case 'bootcamps':
                setBootcampId(e.target.value);
                temp = await FirebaseUtil.getStudents(e.target.value);
                temp.sort((a,b) => {
                    if (a.name < b.name)
                        return -1;
                    else if (a.name > b.name)
                        return 1;
                    else 
                        return 0;
                });
                setStudents(temp);
                setReviews({});
                break;
            case 'students':
                let student = await FirebaseUtil.getStudent(e.target.value);
                student.id = e.target.value;
                setStudent(student);
                getData(student);
                break;
        }
    }

    return (
        <div>
        <br/>
        <h2 className="text-center">Lista de Revisiones</h2>
        <br/>
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
                </tr>) }
            </tbody>
        </table>
        <br />
        <table className="table table-striped">
            </table>
        </div>
      )
}
