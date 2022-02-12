import React, { useState } from 'react';
import {Link, navigate} from '@reach/router';
import {FirebaseUtil} from './Firebase.Util';
import './styles.css';

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleChange = (e) => {
    switch(e.target.name) {
      case 'email':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'verifyPassword':
        setVerifyPassword(e.target.value);
        break;
      default:
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !verifyPassword) {
      setErrors("Debes ingresar usuario y contraseña verificada.");
    }
    else if (password !== verifyPassword) {
      setErrors("Las contraseñas no coinciden.");
    }
    else {
      setErrors('');
      let result;
      await FirebaseUtil.verifyRegisterStudent(username, password)
        .then(response => result = response)
        .catch(error => result = error);
      if (result && result.user) {
        setErrors('Usuario registrado exitosamente');
        navigate("/", result.user);
      }
      else if (result && result.code) {
        setErrors("Error: " + result.code);
      }
      else {
        setErrors("Error: " + result);
      }
    }
  }

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={handleSubmit}>
          <img className="logo" src="/img/Coding-Dojo.jpg" alt="Coding Dojo logo" />
          <h2 className="h3 mb-3 font-weight-normal">Registro de Usuario</h2>
          <label htmlFor="inputEmail" className="sr-only">Usuario</label>
          <input type="email" name="email" className="form-control" placeholder="Correo electrónico" required="" autoFocus="" onChange={handleChange} value={username}/>
          <label htmlFor="inputPassword" className="sr-only">Contraseña</label>
          <input type="password" name="password" className="form-control" placeholder="Contraseña" required="" onChange={handleChange} value={password}/>
          <label htmlFor="inputPasswordVerify" className="sr-only">Verificar Contraseña</label>
          <input type="password" name="verifyPassword" className="form-control" placeholder="Contraseña" required="" onChange={handleChange} value={verifyPassword}/>
          { !errors ? '' : <><br/><div className="text-danger">{errors}</div></> }
          <br/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Registrar</button>
      </form>
      <br/>
      <div>Ya tienes cuenta? <Link to='/'>Inicia sesión</Link> </div>
    </div>)
}
