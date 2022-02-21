import React, { useEffect, useRef, useState } from 'react';
import {Link,navigate} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';
import { BootcampStudents } from './BootcampStudents';
import { BootcampTasks } from './BootcampTasks';

export const BootcampForm = ({editId, isAdmin}) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [active, setActive] = useState(false);
    const [errors, setErrors] = useState('');
    const [newSaved, setNewSaved] = useState(false);
    const firstInput = useRef('');

    useEffect(() => {
      if (!isAdmin) {
        navigate("/home");
        return;
      }

        const getData = async () => {
          if (editId) {
            let result;
            await FirebaseUtil.getBootcamp(editId)
              .then(response => result = response)
              .catch(error => setErrors(error));
            if (result && typeof(result) === "object") {
              setId(editId);
              setName(result.name);
              setCode(result.code);
              setActive(result.active);
            }
          }
          firstInput.current.focus();
        };
        getData();
      },[newSaved]);

      const handleChange = (e) => {
        switch(e.target.name) {
          case 'id':
            setId(e.target.value);
            break;
          case 'code':
            setCode(e.target.value);
            break;
          case 'name':
            setName(e.target.value);
            break;
          case 'active':
            setActive(e.target.checked);
            break;
          default:
        }
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !code)
        {
          setErrors("Debes ingresar un nombre y código válidos.");
          return;
        }
        setErrors('');
        const bootcamp = {
          name: name,
          code: code,
          active: active,
        };
        let result = await FirebaseUtil.updateBootcamp(editId, bootcamp);
        if (result && typeof(result) === "object") {
          setId(result.id);
          setName(result.name);
          setCode(result.code);
          setActive(result.active);
          setErrors("Bootcamp guardado existosamente.");
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
          <h2 className="h3 mb-3 font-weight-normal">{!editId ? "Nuevo Curso" : "Edición Curso"}</h2>
          <label htmlFor="editId" className="sr-only">Id</label>
          <input type="text" name="id" className="form-control" required="" onChange={handleChange} value={id} readOnly/>
          <label htmlFor="code" className="sr-only">code</label>
          <input type="code" name="code" className="form-control" placeholder="Código bootcamp" required="" ref={firstInput} onChange={handleChange} value={code}/>
          <label htmlFor="name" className="sr-only">Nombre</label>
          <input type="text" name="name" className="form-control" placeholder="Nombre bootcamp" required="" onChange={handleChange} value={name}/>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" name="active" onChange={handleChange} checked={active} /> Activo
            </label>
          </div>
          {!errors ? '' : <div className="text-danger">{errors}</div> }
          <br/>
          { !newSaved || editId === id ? <button className="btn btn-primary" type="submit"  >Guardar</button> : ''}
         </form> { id ? <DeleteButton id={id} collection={"bootcamps"} showSeparator={true}/>   : ''}
         <Link to="/bootcamps" className="btn btn-primary">Regresar a Lista</Link>
         <hr/>
         {id.length > 5 ? <BootcampStudents bootcampId={id}/> : ''}
         <hr/>
         {id.length > 5 ? <BootcampTasks bootcampId={id}/> : ''}
    </div>
  )
}
