import React, { useEffect, useRef, useState } from 'react';
import {Link,navigate} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';
import { CommentsListForm } from './CommentsListForm';

export const ReviewForm = ({editId, isAdmin, idBootcamp, idStudent}) => {
  const [id, setId] = useState('');
  const [bootcamps, setBootcamps] = useState([]);
  const [bootcampId, setBootcampId] = useState('');
  const [bootcamp, setBootcamp] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState('');
  const [task, setTask] = useState('');
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [firstComment, setFirstComment] = useState('');
  const [errors, setErrors] = useState('');
  const [newSaved, setNewSaved] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [comments, setComments] = useState([]);
  const firstInput = useRef('');
  const taskRef = useRef('');

  useEffect(() => {
    if (!isAdmin) {
      navigate("/home");
      return;
    }

    const getData = async () => {
        let result = await FirebaseUtil.getBootcamps();
        let tempBootcamps = [];
        if (result && typeof(result) === "object") {
          tempBootcamps = Object.keys(result).map((keyName,i) => {
            return {id: keyName, name: result[keyName].name};
          });
          setBootcamps(tempBootcamps);
        }
        if (idBootcamp) {
          setBootcampId(idBootcamp);
          if (idStudent) {
            setStudentId(idStudent);
          }
          getStudents(idBootcamp);
          getTasks(idBootcamp);
          if (taskRef.current)
          taskRef.current.focus();
        }
        if (editId) {
          let result;
          await FirebaseUtil.getReview(editId)
            .then(response => result = response)
            .catch(error => setErrors(error));
          if (result && typeof(result) === "object") {
            setId(result.id);
            setCreatedAt(result.createdAt);
            setBootcampId(result.bootcampId);
            setTaskId(result.taskId);
            setStudentId(result.studentId);
            setFirstComment(result.firstComment);
            setTaskCompleted(result.taskCompleted);
            setComments(result.comments ?? []);
            if (Array.isArray(tempBootcamps)) {
              let bootcamp = tempBootcamps.find(item => item.id === result.bootcampId);
              setBootcamp(bootcamp.name);
            }
            let student = await FirebaseUtil.getStudent(result.studentId);
            setStudent(student.name);
            let task = await FirebaseUtil.getTask(result.taskId);
            setTask(task.name);
          }
        }
        if (firstInput.current)
          firstInput.current.focus();
      };
      getData();
    },[newSaved]);

    const getStudents = (bootcampId) => {
      if (bootcampId && bootcampId.length > 5) {
        FirebaseUtil.getStudents(bootcampId)
          .then(response => {
            let temp = response;
            temp.sort((a,b) => {
              if (a.name < b.name)
                return -1;
              else if (a.name > b.name)
                return 1;
              else 
                return 0;
            })
            setStudents(temp);
          })
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
          if (!firstComment)
            setFirstComment("Tarea correcta");
          break;
        case "firstComment":
          setFirstComment(e.target.value);
          break;
        case "createdAt":
          setCreatedAt(e.target.value);
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
        createdAt:  id ? createdAt : new Date().toISOString(),
        updatedAt: id ? new Date().toISOString() : '',
        bootcampId: bootcampId,
        taskId: taskId,
        studentId: studentId,
        firstComment: firstComment,
        taskCompleted: taskCompleted,
        comments: comments,
      };
      let result = await FirebaseUtil.updateReview(editId, review);
      if (result && typeof(result) === "object") {
        setId(result.id);
        setCreatedAt(result.createdAt);
        setBootcampId(result.bootcampId);
        setTaskId(result.taskId);
        setStudentId(result.studentId);
        setTaskCompleted(result.taskCompleted);
        setFirstComment(result.firstComment);
        setComments(result.comments);
        setErrors("Revisión guardada existosamente.");
        setNewSaved(true);
      }
      else {
        setErrors(result);
      }
  }

return (
  <div className="text-center">
      <br/>
      <form className="form-signin" onSubmit={handleSubmit}  style={{"maxWidth":"500px"}}>
        <h2 className="h3 mb-3 font-weight-normal">{!editId ? "Nuevo Revisión" : "Edición Revisión"}</h2>
        <table width="100%">
          <tbody>
            <tr>
            <td width="30%" className="text-start"><label htmlFor="id" className="sr-only">Id:</label></td>
            <td>
              <input type="text" name="id" className="form-control" required="" onChange={handleChange} value={id} readOnly/>
            </td>
          </tr>
          <tr>
            <td className="text-start"><label htmlFor="createdAt" className="sr-only">Fecha Creación:</label></td>
            <td>
              <input type="text" name="createdAt" className="form-control" required="" onChange={handleChange} value={createdAt} readOnly/>
            </td>
          </tr>
          <tr>
            <td className="text-start"><label htmlFor="bootcampId" className="sr-only">Curso:</label></td>
            <td>
                { id ? <input className="form-control" required onChange={handleChange} value={bootcamp} disabled /> 
            : <select name="bootcampId" className="form-control" required="" ref={firstInput} onChange={handleChange} value={bootcampId}>
              <option key={0} value={''} disabled>[Seleccione un Bootcamp]</option>
              {bootcamps.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
            </select>}
            </td> 
          </tr>
          <tr>
            <td className="text-start"><label htmlFor="studentId" className="sr-only">Estudiante:</label></td>
            <td>
                {id ?  <input className="form-control" required onChange={handleChange} value={student} disabled/> 
                : <select name="studentId" className="form-control" required="" onChange={handleChange} value={studentId} >
                  <option key={0} value={''} disabled>[Seleccione un Estudiante]</option>
                  {students.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
                </select>}
            </td>
          </tr>
          <tr>
              <td className="text-start"><label htmlFor="taskId" className="sr-only">Tarea:</label></td>
              <td>
              { id ? <input className="form-control" required onChange={handleChange} value={task} disabled/> 
                : <select name="taskId" className="form-control" required="" onChange={handleChange} value={taskId} ref={taskRef}>
                  <option key={0} value={''} disabled>[Seleccione una Tarea]</option>
                  {tasks.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
                </select>}
              </td>
            </tr>
            <tr>
              <td className="text-start"><label htmlFor="taskId" className="sr-only">Completada:</label></td>
              <td>
                <input type="checkbox" name="finished" onChange={handleChange} checked={taskCompleted}/> 
              </td>
            </tr>
            <tr>
              <td className="text-start"><label htmlFor="firstComment" className="sr-only">Primer Comentario:</label></td>
            </tr>
            <tr>
              <td colSpan="100%">
                <textarea name="firstComment" className="form-control" placeholder="Ingresa el primer comentario" required="" onChange={handleChange} value={firstComment} />
              </td>
            </tr>
          </tbody>
        </table>
        {!errors ? '' : <div className="text-danger">{errors}</div> }
        <br/>
        { !newSaved || editId === id ? <button className="btn btn-primary" type="submit">Guardar</button> : '' }
       </form> { id ? <DeleteButton id={id} collection={"reviews"} showSeparator={true} />   : ''}
       <Link to="/reviews" className="btn btn-primary">Regresar a Lista</Link>
       <CommentsListForm reviewId={editId} studentId={studentId} taskCompleted={taskCompleted} isAdmin={true} comments={comments} setComments={setComments} />
  </div>
  )
}
