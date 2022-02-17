import React, { useEffect, useState } from 'react';
import {Link,navigate} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';

export const TasksForm = ({editId, isAdmin}) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [url, setUrl] = useState('');
    const [active, setActive] = useState(false);
    const [errors, setErrors] = useState('');
    const [newSaved, setNewSaved] = useState(false);

    useEffect(() => {
      if (!isAdmin) {
        navigate("/home");
        return;
      }

        const getData = async () => {
          if (editId) {
            let result;
            await FirebaseUtil.getTask(editId)
              .then(response => result = response)
              .catch(error => setErrors(error));
            if (result && typeof(result) === "object") {
              setId(editId);
              setName(result.name);
              setCode(result.code);
              setActive(result.active);
              setUrl(result.url);
            }
          }
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
          case 'url':
              setUrl(e.target.value);
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
        const task = {
          name: name,
          code: code,
          active: active,
          url: url,
        };
        let result = await FirebaseUtil.updateTask(editId, task);
        if (result && typeof(result) === "object") {
          setId(result.id);
          setName(result.name);
          setCode(result.code);
          setActive(result.active);
          setUrl(result.url);
          setErrors("Tarea guardada existosamente.");
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
          <h2 className="h3 mb-3 font-weight-normal">{!editId ? "Nueva Tarea" : "Edición Tarea"}</h2>
          <label htmlFor="editId" className="sr-only">Id</label>
          <input type="text" name="editId" className="form-control" required="" onChange={handleChange} value={id} readOnly/>
          <label htmlFor="code" className="sr-only">code</label>
          <input type="code" name="code" className="form-control" placeholder="Código tarea" required="" autoFocus="" onChange={handleChange} value={code}/>
          <label htmlFor="name" className="sr-only">Nombre</label>
          <input type="text" name="name" className="form-control" placeholder="Nombre tarea" required="" onChange={handleChange} value={name}/>
          <label htmlFor="name" className="sr-only">Url -&gt; </label>
          {url ? <a href={url} target="_blank" rel="noreferrer">Enlace</a> : ''}
          <input type="text" name="url" className="form-control" placeholder="Url tarea" required="" onChange={handleChange} value={url}/>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" name="active" onChange={handleChange} checked={active}/> Activo
            </label>
          </div>
          {!errors ? '' : <div className="text-danger">{errors}</div> }
          <br/>
          { !newSaved || editId === id ? <button className="btn btn-primary" type="submit">Guardar</button> : ''}
         </form> { id ? <DeleteButton id={id} collection={"tasks"} showSeparator={true} />   : ''}
         <Link to="/tasks" className="btn btn-primary">Regresar a Lista</Link>
    </div>
  )
}
