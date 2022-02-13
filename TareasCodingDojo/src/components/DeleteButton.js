import React from 'react';
import { FirebaseUtil } from './Firebase.Util';
import {navigate} from '@reach/router';

export const DeleteButton = ({id, collection, setDeleteId}) => {
    const handleClick = (e) => {
        let result = false;
        console.log(collection, id);
        switch (collection) {
            case "students":
                result = FirebaseUtil.deleteStudent(id);
                break;
            case "bootcamps":
                result = FirebaseUtil.deleteBootcamps(id);
                break;;
            case "tasks":
                result = FirebaseUtil.deleteTasks(id);
                break;
            case "comments":
                result = FirebaseUtil.deleteComments(id);
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

  return (
    <>
        <button className="btn btn-danger" onClick={handleClick}>Eliminar</button>
    </>
  )
}
