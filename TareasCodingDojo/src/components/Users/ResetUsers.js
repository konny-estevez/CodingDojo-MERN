import React, { useState } from 'react';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';

export const ResetUsers = ({user}) => {;
    const [errors, setErrors] = useState('');
    const isAdmin = user.email &&  user.email === "konny.estevez@gmail.com" ? true : false;

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors('');
      if (window.confirm("Esta seguro que desea resetear TODOS LOS USUARIOS?")) {
        await FirebaseUtil.getStudent(user);
            /*.then(response => setErrors(response))
            .catch(error => setErrors(error));*/
      }
    }

  return (
    <div className="text-center">
        <form className="form-signin" onSubmit={handleSubmit}>
          <img className="logo" src="/img/Coding-Dojo.jpg" alt="Coding Dojo logo" />
          <h2 className="h3 mb-3 font-weight-normal">Resetear Usuarios</h2>
          {!errors ? '' : <div className="text-danger">{errors}</div> }
          <br/>
          { isAdmin ?
          <button className="btn btn-lg btn-primary btn-block" type="submit">Proceder</button> : ''
            }
        </form>
    </div>
  )
}
