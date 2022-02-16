import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';
import { DeleteButton } from '../Utils/DeleteButton';

export const StudentForm = ({editId, user}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(false);
  const [errors, setErrors] = useState('');
  const [newSaved, setNewSaved] = useState(false);
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  useEffect(() => {
    const getData = async () => {
      if (editId) {
        let result;
        await FirebaseUtil.getStudent(editId)
          .then(response => result = response)
          .catch(error => setErrors(error));
        if (result && typeof(result) === "object") {
          setId(editId);
          setName(result.name);
          setEmail(result.email);
          setActive(result.active);
        }
      }
    };
    getData();
  },[id,editId]);

  const handleChange = (e) => {
    switch(e.target.name) {
      case 'id':
        setId(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
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
      if (!name || !email || !emailRegex.test(email))
      {
        setErrors("Debes ingresar un nombre y correo electrónico válidos.");
        return;
      }
      setErrors('');
      const student = {
        name: name,
        email: email,
        active: active,
      };
      let result = await FirebaseUtil.updateStudent(editId, student);
      if (result && typeof(result) === "object") {
        setId(result.id);
        setName(result.name);
        setEmail(result.email);
        setActive(result.active);
        setErrors("Estudiante guardado existosamente.");
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
          <h2 className="h3 mb-3 font-weight-normal">{!editId ? "Nuevo Estudiante" : "Edición Estudiante"}</h2>
          <label htmlFor="editId" className="sr-only">Id</label>
          <input type="text" name="editId" className="form-control" required="" onChange={handleChange} value={id} readOnly/>
          <label htmlFor="name" className="sr-only">Nombre</label>
          <input type="text" name="name" className="form-control" placeholder="Nombre estudiante" required="" onChange={handleChange} value={name}/>
          <label htmlFor="email" className="sr-only">Email</label>
          <input type="email" name="email" className="form-control" placeholder="Correo electrónico" required="" autoFocus="" onChange={handleChange} value={email}/>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" name="active" onChange={handleChange} checked={active}/> Activo
            </label>
          </div>
          {!errors ? '' : <div className="text-danger">{errors}</div> }
          <br/>
          { !newSaved || editId === id ? <button className="btn btn-primary" type="submit">Guardar</button> : '' }
         </form> { id ? <DeleteButton id={id} collection={"students"} showSeparator={true}/>   : ''}
         <Link to="/students" className="btn btn-primary">Regresar a Lista</Link>
    </div>
  )
}
