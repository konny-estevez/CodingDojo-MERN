import React, { useEffect, useState } from 'react';
import {Link } from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { CommentsListForm } from './CommentsListForm';

export const ReviewStudentForm = ({reviewId,isAdmin}) => {
  const [id, setId] = useState('');
  const [bootcampId, setBootcampId] = useState('');
  const [bootcamp, setBootcamp] = useState('');
  const [taskId, setTaskId] = useState('');
  const [task, setTask] = useState('');
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [firstComment, setFirstComment] = useState('');
  const [errors, setErrors] = useState('');
  const [newSaved, setNewSaved] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

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
          case "finished":
            setTaskCompleted(e.target.value);
            break;
        default:
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  }

  return (
    <div className="text-center">
    <br/>
    <div className="form-signin" style={{"maxWidth":"500px"}} >
      <h2 className="h3 mb-3 font-weight-normal">Edición Revisión</h2>
      <form onSubmit={handleSubmit} >
      <table width="100%">
          <tbody>
        <tr>
            <td width="30%" className="text-start"><label htmlFor="id" className="sr-only">Id:</label></td>
            <td >
                <input name="id" className="form-control" required="" onChange={handleChange} value={id} readOnly/>
            </td>
        </tr>
        <tr>
            <td className="text-start"><label htmlFor="createdAt" className="sr-only">Fecha Creación:</label></td>
            <td><input name="createdAt" className="form-control" onChange={handleChange} value={createdAt} readOnly/></td>
        </tr>
        <tr>
            <td className="text-start"><label htmlFor="bootcampId" className="sr-only">Curso:</label></td>
            <td><input className="form-control"  onChange={handleChange} value={bootcamp} disabled /></td>
        </tr>
        <tr>
            <td className="text-start"><label htmlFor="studentId" className="sr-only">Estudiante:</label></td>
            <td><input className="form-control"  onChange={handleChange} value={student} disabled/></td>
        </tr>
        <tr>
            <td className="text-start"><label htmlFor="taskId" className="sr-only">Tarea:</label></td>
            <td><input className="form-control"  onChange={handleChange} value={task} disabled/></td>
        </tr>
        <tr>
            <td className="text-start"><label htmlFor="taskId" className="sr-only">Completada:</label></td>
            <td><input type="checkbox" name="finished" onChange={handleChange} checked={taskCompleted}/></td>
        </tr>
        <tr><td>Primer Comentario:</td></tr>
        <tr>
            <td colSpan="100%">
                <textarea name="firstComment" className="form-control" placeholder="Ingresa el primer comentario" required="" onChange={handleChange} value={firstComment} disabled/>
            </td>
        </tr>
        </tbody>
      </table>
      {!errors ? '' : <div className="text-danger">{errors}</div> }
      <br/>
      { (!newSaved || reviewId === id) && isAdmin 
        ? <><button className="btn btn-primary" type="submit">Guardar</button><br/><br/></>
         : '' }
      </form>
        <Link to={"/reviews/student/" + studentId} className="btn btn-primary">Regresar a Lista</Link>
     </div>
        <CommentsListForm reviewId={reviewId} studentId={studentId} taskCompleted={taskCompleted} isAdmin={false} comments={comments} setComments={setComments}/>
</div>
)
}
