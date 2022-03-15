import React, { useState,useEffect, useRef } from 'react';
import {Link, navigate} from '@reach/router';
import {FirebaseUtil} from '../Utils/Firebase.Util';
import '../Utils/styles.css';

export const LoginForm = ({user,setUser,isAdmin,isStudent,setFullName}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const firstInput = useRef('');

  useEffect(() => {
    if (!(user && user.uid)) {
      navigate("/");
      return;
    }

      if (isAdmin || isStudent) {
        console.log("Redirect to home");
        navigate("/home");
      }
      firstInput.current.focus();
  }, [isAdmin,isStudent,user]);  

  const handleChange = (e) => {
    switch(e.target.name) {
      case 'email':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!username || !password) {
        setErrors("Debes ingresar usuario y contraseña válidos.");
      }
      else {
        let result = {};
        setErrors('');
        await FirebaseUtil.signInUser(username, password)
          .then(response => result = response)
          .catch(error => result = error);
        if (result && result.user) {
          setUser(result.user);
          //localStorage.setItem("coding-dojo-tasks", result.user.uid);
          localStorage.setItem("coding-dojo-tasks", JSON.stringify(result.user));
          let student = await FirebaseUtil.getStudent(result.user.uid);
          if (student.name)
            setFullName(student.name.toLowerCase());
          else 
            setFullName("admin");
          navigate("/home", result.user);
        }
        else if (result && result.code) {
          setErrors(result.message);
        }
      }
  }

  return (
    <div className="text-center">
        <form className="form-signin" onSubmit={handleSubmit}>
          <img className="logo" src="/img/Coding-Dojo.jpg" alt="Coding Dojo logo" />
          <h2 className="h3 mb-3 font-weight-normal">Inicia sesión</h2>
          <label htmlFor="inputEmail" className="sr-only">Usuario</label>
          <input type="email" name="email" className="form-control" placeholder="Correo electrónico" required="" ref={firstInput} onChange={handleChange} value={username}/>
          <label htmlFor="inputPassword" className="sr-only">Contraseña</label>
          <input type="password" name="password" className="form-control" placeholder="Contraseña" required="" onChange={handleChange} value={password}/>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"/> Recordarme
            </label>
          </div>
          {!errors ? '' : <div className="text-danger">{errors}</div> }
          <br/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Ingresar</button>
        </form>
        <div><Link to='/register'>No tienes cuenta?</Link> </div>
        <div><Link to='/forgotPassword'>Olvidaste tu contraseña?</Link> </div>
    </div>
  )
}
