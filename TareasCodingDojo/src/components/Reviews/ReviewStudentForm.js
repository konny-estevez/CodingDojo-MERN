import React, { useEffect, useState } from 'react';
import {Link,navigate} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';

export const ReviewStudentForm = ({studentIdx,reviewId}) => {
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
  const [comment, setComment] = useState('');
  const [commentErrors, setCommentErrors] = useState('');

  useEffect(() => {
    
    const getData = async () => {
        let result;
        await FirebaseUtil.getReview(reviewId)
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
          let bootcamp = await FirebaseUtil.getBootcamp(result.bootcampId);
          setBootcamp(bootcamp.name);
          let student = await FirebaseUtil.getStudent(result.studentId);
          setStudent(student.name);
          let task = await FirebaseUtil.getTask(result.taskId);
          setTask(task.name);
        }
    }
    getData();
  }, [])

  const handleChange = (e) => {
      switch (e.target.name) {
          case "comment":
            setComment(e.target.value);
            break;
        default:
      }
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!comment) {
          setCommentErrors("Debes ingresar un comentario válido.");
          return;
      }
      const newComment = {
          createdAt: new Date().toISOString(),
          comment: comment,
      }
      let result = await FirebaseUtil.updateComment(null, newComment, reviewId);
      if(result) {
        setNewSaved(true);
      }
      setCommentErrors("Comentario guardado exitosamente");
  }

  return (
    <div className="text-center">
    <br/>
    <div className="form-signin" style={{"maxWidth":"400px"}} >
      <h2 className="h3 mb-3 font-weight-normal">Edición Revisión</h2>
      <table width="100%">
          <tbody>
        <tr>
            <td width="40%"><label htmlFor="id" className="sr-only">Id:</label></td>
            <td >
                <input name="id" className="form-control" required="" onChange={handleChange} value={id} readOnly/>
            </td>
        </tr>
        <tr>
            <td><label htmlFor="createdAt" className="sr-only">Fecha Creación:</label></td>
            <td><input name="createdAt" className="form-control" onChange={handleChange} value={createdAt} readOnly/></td>
        </tr>
        <tr>
            <td><label htmlFor="bootcampId" className="sr-only">Curso:</label></td>
            <td><input className="form-control"  onChange={handleChange} value={bootcamp} disabled /></td>
        </tr>
        <tr>
            <td><label htmlFor="studentId" className="sr-only">Estudiante:</label></td>
            <td><input className="form-control"  onChange={handleChange} value={student} disabled/></td>
        </tr>
        <tr>
            <td><label htmlFor="taskId" className="sr-only">Tarea:</label></td>
            <td><input className="form-control"  onChange={handleChange} value={task} disabled/></td>
        </tr>
        <tr>
            <td><label htmlFor="taskId" className="sr-only">Completada:</label></td>
            <td><input type="checkbox" name="finished" onChange={handleChange} checked={taskCompleted}/></td>
        </tr>
        <tr><td>Primer Comentario</td></tr>
        <tr>
            <td colSpan="100%">
                <textarea name="firstComment" className="form-control" placeholder="Ingresa el primer comentario" required="" onChange={handleChange} value={firstComment} disabled/>
            </td>
        </tr>
        </tbody>
      </table>
      {!errors ? '' : <div className="text-danger">{errors}</div> }
      <br/>
        <Link to={"/reviews/student/" + studentId} className="btn btn-primary">Regresar a Lista</Link>
      { !taskCompleted && !newSaved ? <form onSubmit={handleSubmit}>
        <hr/>
        <h3>Nuevo Comentario</h3>
        <textarea name='comment' className="form-control" onChange={handleChange} value={comment}></textarea>
        {!commentErrors ? '' : <div className="text-danger">{commentErrors}</div> }
        <br/>
        <button className="btn btn-primary" type="submit">Guardar</button> 
      </form> : '' }
      <hr/>
      { !taskCompleted ? <DeleteButton id={id} collection={"comments"} showSeparator={true} />   : ''}
     </div>
</div>
)
}
