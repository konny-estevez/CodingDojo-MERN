import React from 'react';
import { FirebaseUtil } from '../Utils/Firebase.Util';

export const UpdateIdButton = ({id, collection, setUpdateId, separator}) => {
  const handleUpdateId = async () => {
      let updateConfirm = window.confirm(`Esta seguro que desea actualizar el ID del item ${id}?`);
      if (updateConfirm) {
        let result = false;
        switch (collection) {
            case "students":
                await FirebaseUtil.updateStudentId(id)
                    .then(response => {result = response; 
                    console.log(response);})
                    .catch(error => console.log(error));
                    setUpdateId(result.id);
                console.log("Resultado UpdateId: ", result);
                break;
            case "bootcamps":
                result = await FirebaseUtil.updateBootcampId(id);
                break;
            case "tasks":
                result = await FirebaseUtil.updateTaskId(id);
                break;
            default:
        }
        if (result && setUpdateId) {
            setUpdateId(id);
        }
    }
  }

  return (
      <> {id.length < 8 ? <>&nbsp;&nbsp;|&nbsp;&nbsp;</> : ''}
    {id.length < 8 ? <button className="btn btn-primary" onClick={handleUpdateId} >Generar Id</button> : ''}
    </>
  )
}
