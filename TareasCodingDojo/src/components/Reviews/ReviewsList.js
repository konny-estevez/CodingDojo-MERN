import React, { useEffect, useState } from 'react';
import {Link,navigate} from '@reach/router';
import '../Utils/styles.css';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import { DeleteButton } from '../Utils/DeleteButton';
import { UpdateIdButton } from '../Utils/UpdateIdButton';

export const ReviewsList = ({isAdmin}) => {
    const [reviews, setReviews] = useState({});
    const [errors, setErrors] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [bootcamps, setBootcamps] = useState([]);
    const [students, setStudents] = useState([]);
    const [tasks, setTasks] = useState([]);
    //const [student, setStudent] = useState('');
    const [bootcampId, setBootcampId] = useState('');
    const [studentId, setStudentId] = useState('');

    useEffect(() => {
        if (!isAdmin) {
            navigate("/home");
            return;
          }

        getCatalogs();
    }, [updateId]);

    const getCatalogs = async () => {
        let result = await FirebaseUtil.getBootcamps();
        let temp = Object.keys(result).map(key => {
            return {id: key, name: result[key].name};
        });
        setBootcamps(temp);
        result = await FirebaseUtil.getTasks();
        temp = Object.keys(result).map(key => {
            return {id: key, name: result[key].name};
        });
        setTasks(temp);
    }

    const getData = async (studentId) => {
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
          /*let result = await FirebaseUtil.getStudents();
          let temp = Object.keys(result).map(key => {
              return {id: key, name: result[key].name};
          });
          setStudents(temp);*/
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
                setStudentId(e.target.value);
                getData(e.target.value);
                break;
        }
    }

    return (
    <div>
    {isAdmin ? 
        <>
        <div className="row">
            <br/>
            <div className="col-md-1">
                <label htmlFor="bootcamps" className="form-label" >Curso:</label>
            </div>
            <div className="col-md-4">
                <select className="form-control" name="bootcamps" onChange={handleChange} value={bootcampId} >
                    <option key={0} value="">[Selecciona un curso]</option>
                    { bootcamps.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                </select>
            </div>
            <div className="col-md-1">
                <label htmlFor="students" className="form-label" >Estudiante:</label>
            </div>
            <div className="col-md-4">
                <select className="form-control" name="students" onChange={handleChange} value={studentId} >
                    <option key={0} value="">[Selecciona un estudiante]</option>
                    { students.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)}
                </select>
            </div>
            <br/> 
            </div></>: ''}
        <br/>
        <h2 className="text-center">Lista de Revisiones</h2>
        { bootcampId 
        ? <Link to={"/reviews/" + bootcampId + "/" + studentId} className="btn btn-primary">Nuevo</Link>
        : <Link to="/reviews/new" className="btn btn-primary">Nuevo</Link> }
        <br/>
        {!errors ? '' : <div className="text-danger">{errors}</div> }
        <table className="table table-striped">
        <thead>
            <tr>
                <th className="text-center">No.</th>
                <th className="text-center" width="10%">Id</th>
                <th className="text-center" width="15%">Curso</th>
                <th className="text-center" width="20%">Estudiante</th>
                <th className="text-center" width="15%">Tarea</th>
                <th className="text-center">Completada</th>
                <th className="text-center">Fecha Creación</th>
                <th className="text-center">Fecha Actualización</th>
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
                <td>{reviews[keyName].updatedAt ? reviews[keyName].updatedAt.substring(0,10) : ''}</td>
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
