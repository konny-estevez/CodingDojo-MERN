import React from 'react';
import {navigate} from '@reach/router';
import { FirebaseUtil } from '../Utils/Firebase.Util';

export const DeleteButton = ({id, collection, setDeleteId, showSeparator}) => {
    const handleClick = (e) => {
        let deleteConfirm = window.confirm(`Está seguro que desea eliminar el item ${id}?`);
        if (deleteConfirm) {
            let result = false;
            switch (collection) {
                case "students":
                    result = FirebaseUtil.deleteStudent(id);
                    break;
                case "bootcamps":
                    result = FirebaseUtil.deleteBootcamp(id);
                    break;
                case "tasks":
                    result = FirebaseUtil.deleteTask(id);
                    break;
                case "reviews":
                    result = FirebaseUtil.deleteReview(id);
                    break;
                case "comments":
                    result = FirebaseUtil.deleteComment(id);
                    break;
                default:
            }
            if (result && setDeleteId) {
                setDeleteId(id);
            }
            if (result && !setDeleteId) {
                navigate("/" + collection);
            }
        }
    }

  return (
    <>
        <button className="btn btn-danger" onClick={handleClick}>Eliminar</button>
        {showSeparator ? <>&nbsp;&nbsp;|&nbsp;&nbsp;</> : ''}
    </>
  )
}
