import React, { useRef, useState } from 'react'
import {Link} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';

export const ForgotPasswordForm = () => {
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState('');
    const firstInput = useRef('');

    firstInput.current.focus();
    const handleChange = (e) => {
        switch(e.target.name) {
          case 'email':
            setUsername(e.target.value);
            break;
          default:
        }
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username) {
          setErrors("Debes ingresar tu email de registro.");
        }
        else {
          setErrors('');
          let result;
          await FirebaseUtil.resetPassword(username)
            .then(response => result = response)
            .catch(error => setErrors(error));
          if (result && result.code) {
            setErrors(result.message);
          }
          else {
            setErrors('Correo de reseteo enviado exitosamente.');
          }
        }
      }
      
    return (
      <div className="text-center">
        <form className="form-signin" onSubmit={handleSubmit}>
            <img className="logo" src="/img/Coding-Dojo.jpg" alt="Coding Dojo logo" />
            <h2 className="h3 mb-3 font-weight-normal">Reseteo de Contraseña</h2>
            <label htmlFor="inputEmail" className="sr-only">Usuario</label>
            <input type="email" name="email" className="form-control" placeholder="Correo electrónico" required="" ref={firstInput} onChange={handleChange} value={username}/>
            <br/>
            {!errors ? '' : <div className="text-danger">{errors}</div> }
            <br/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Enviar</button>
        </form>
      <div>Ya tienes cuenta? <Link to='/'>Inicia sesión</Link> </div>
      </div>
  )
}
