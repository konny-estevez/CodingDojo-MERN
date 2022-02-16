import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';

export const ReviewForm = ({editId, user}) => {
  const [id, setId] = useState('');
  const [bootcamps, setBootcamps] = useState([]);
  const [bootcampId, setBootcampId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState('');
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [firstComment, setFirstComment] = useState('');
  const [errors, setErrors] = useState('');
  const [newSaved, setNewSaved] = useState(false);

  useEffect(() => {
      const getData = async () => {
        let result = await FirebaseUtil.getBootcamps();
        if (result && typeof(result) === "object") {
          let temp = [];
          Object.keys(result).map((keyName,i) => {
            temp = [...temp, {id: keyName, name: result[keyName].name}];
            return temp;
          });
          setBootcamps(temp);
        }

        if (editId) {
          let result;
          await FirebaseUtil.getReview(editId)
            .then(response => result = response)
            .catch(error => setErrors(error));
          if (result && typeof(result) === "object") {
            setId(result.id);
            setBootcampId(result.bootcampId);
            setTaskId(result.taskId);
            setStudentId(result.studentId);
            setFirstComment(result.firstComment);
            setTaskCompleted(result.taskCompleted);
          }
        }
      };
      getData();
    },[id,editId]);

    const getStudents = (bootcampId) => {
      if (bootcampId && bootcampId.length > 5) {
        FirebaseUtil.getStudents(bootcampId)
          .then(response => setStudents(response))
          .catch(error => setErrors(error));
      }
    }

    const getTasks = (bootcampId) => {
      if (bootcampId && bootcampId.length > 5) {
        FirebaseUtil.getTasks(bootcampId)
          .then(response => setTasks(response))
          .catch(error => setErrors(error));
      }
    }

    const handleChange = (e) => {
      switch(e.target.name) {
        case 'id':
          setId(e.target.value);
          break;
        case 'bootcampId':
          setBootcampId(e.target.value);
          getStudents(e.target.value);
          getTasks(e.target.value);
          break;
        case 'studentId':
          setStudentId(e.target.value);
          break;
        case 'taskId':
          setTaskId(e.target.value);
          break;
        case 'finished':
          setTaskCompleted(e.target.checked);
          break;
        case "firstComment":
          setFirstComment(e.target.value);
          break;
        default:
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!bootcampId || !taskId || !studentId || !firstComment)
      {
        setErrors("Debes ingresar bootcamp, tarea, estudiante y comentario válidos.");
        return;
      }
      setErrors('');
      const review = {
        createdAt: new Date().toISOString(),
        bootcampId: bootcampId,
        taskId: taskId,
        studentId: studentId,
        firstComment: firstComment,
        taskCompleted: taskCompleted,
      };
      let result = await FirebaseUtil.updateReview(editId, review);
      if (result && typeof(result) === "object") {
        setId(result.id);
        setBootcampId(result.bootcampId);
        setTaskId(result.taskId);
        setStudentId(result.studentId);
        setTaskCompleted(result.finished);
        setFirstComment(result.firstComment);
        setErrors("Comentario guardado existosamente.");
        setNewSaved(true);
      }
      else {
        setErrors(result);
      }
  }

return (
  <div className="text-center">
      <br/>
      <form className="form-signin" onSubmit={handleSubmit}>
        <h2 className="h3 mb-3 font-weight-normal">{!editId ? "Nuevo Comentario" : "Edición Comentario"}</h2>
        <label htmlFor="editId" className="sr-only">Id</label>
        <input type="text" name="editId" className="form-control" required="" onChange={handleChange} value={id} readOnly/>
        <label htmlFor="bootcampId" className="sr-only">Bootcamp</label>
        <select name="bootcampId" className="form-control" required="" autoFocus="" onChange={handleChange} value={bootcampId}>
          <option key={0} value={''} disabled>[Seleccione un Bootcamp]</option>
          {bootcamps.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
         </select> 
         <label htmlFor="studentId" className="sr-only">Estudiante</label>
         {id ?  <input className="form-control" required onChange={handleChange} value={studentId} disabled/> :
        <select name="studentId" className="form-control" required="" onChange={handleChange} value={studentId} >
          <option key={0} value={''} disabled>[Seleccione un Estudiante]</option>
          {students.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
        </select>}
        <label htmlFor="taskId" className="sr-only">Tarea</label>
        { id ? <input className="form-control" required onChange={handleChange} value={taskId} disabled/> :
        <select name="taskId" className="form-control" required="" onChange={handleChange} value={taskId} >
          <option key={0} value={''} disabled>[Seleccione una Tarea]</option>
          {tasks.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
        </select>}
        <br/>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" name="finished" onChange={handleChange} checked={taskCompleted}/> Tarea completada
          </label>
        </div>
        <label htmlFor="firstComment" className="sr-only">Primer Comentario</label>
        <textarea name="firstComment" className="form-control" placeholder="Ingresa el primer comentario" required="" onChange={handleChange} value={firstComment} />
        {!errors ? '' : <div className="text-danger">{errors}</div> }
        <br/>
        { !newSaved || editId === id ? <button className="btn btn-primary" type="submit">Guardar</button> : '' }
       </form> { id ? <DeleteButton id={id} collection={"reviews"} showSeparator={true} />   : ''}
       <Link to="/reviews" className="btn btn-primary">Regresar a Lista</Link>
  </div>
)
}
