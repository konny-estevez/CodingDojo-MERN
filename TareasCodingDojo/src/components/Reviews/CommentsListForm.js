import React, { useEffect, useState } from 'react';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';

export const CommentsListForm = ({reviewId, taskCompleted, isAdmin, comments, setComments}) => {
    const [newSaved, setNewSaved] = useState(false);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            let data = [];
            let comments = await FirebaseUtil.getComments(reviewId);
            if (typeof(comments) === "object") {
                setComments(comments);
                data = Object.keys(comments).map(key => {
                    return {
                        id: key,
                        createdAt: comments[key].createdAt,
                        comment: comments[key].comment,
                        isAdmin: comments[key].isAdmin,
                    };
                });
            }
            setCommentsList(data);
            setNewSaved(false);
        };
        getData();
    }, [newSaved]);

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
            setErrors("Debes ingresar un comentario válido.");
            return;
        }
        const newComment = {
            createdAt: new Date().toISOString(),
            comment: comment,
            isAdmin: isAdmin,
        }
        let result = await FirebaseUtil.updateComment(null, newComment, reviewId);
        if(result) {
          setNewSaved(true);
          setComment('');
          setErrors("Comentario guardado exitosamente");
          setComments({...comments, [result.id]: newComment});
          setCommentsList([...commentsList, result]);
          let review = await FirebaseUtil.getReview(reviewId);
          review.updatedAt = new Date().toISOString();
          FirebaseUtil.updateReview(reviewId, review);
        }
    }

    const updateReviewDate = async (id) => {
        let review = await FirebaseUtil.getReview(reviewId);
        review.updatedAt = new Date().toISOString();
        FirebaseUtil.updateReview(reviewId, review);
        setNewSaved(!newSaved);
    }

  return (
      <div width="500px">
          <br/>
          <h3>Lista de Comentarios</h3>
            <table className="table table-striped" width="100%">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha Creación</th>
                        <th width="60%">Comentario</th>
                        <th>Propietario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {commentsList.map((item,i) => <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.createdAt.substring(0,10)}</td>
                        <td className="text-start">{item.comment}</td>
                        <td>{item.isAdmin ? "Tutor" : "Estudiante"}</td>
                        <td>
                        { (!item.isAdmin || isAdmin) && !taskCompleted ? <DeleteButton id={item.id} collection={`reviews/${reviewId}/comments`} 
                            setDeleteId={updateReviewDate} showSeparator={false} /> : <></>}
                        </td>
                    </tr>) }
                </tbody>
            </table>
        <hr/>
        { !taskCompleted ? <form onSubmit={handleSubmit}>
        <h3>Nuevo Comentario</h3>
        <textarea name='comment' className="form-control" onChange={handleChange} value={comment}></textarea>
        {!errors ? '' : <div className="text-danger">{errors}</div> }
        <br/>
        <button className="btn btn-primary" type="submit">Guardar</button> 
      </form> : ''}
      </div>
  )
}
