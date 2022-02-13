import React from 'react';
import {Link, navigate} from '@reach/router';
import { FirebaseUtil } from './Firebase.Util';

export const NavBar = ({user, setUser}) => {
    //console.log("User en Navbar:", user);
    let isAdmin = user.email &&  user.email === "konny.estevez@gmail.com" ? true : false;
    let isStudent = user.email && user.email !== "konny.estevez@gmail.com" ? true : false;
    isStudent = true;
    console.log(isAdmin, isStudent);
    if (!isAdmin && !isStudent) {
        //navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
         FirebaseUtil.closeSession();
        setUser({});
        navigate("/");
    }

  return (
    <>{ isAdmin || isStudent ? 
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                { isAdmin || isStudent ? 
                    <li className="nav-item active">
                        <Link to="/home" className="nav-link" >Inicio</Link>
                    </li> : ''}
                { isAdmin ? <>
                    <li className="nav-item">
                        <Link to="/students" className="nav-link" >Estudiantes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/bootcamps" className="nav-link" >Cursos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/tasks" className="nav-link" >Tareas</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/comments" className="nav-link" >Comentarios</Link>
                    </li>
                </>: ''}
                {isStudent ? 
                    <li className="nav-item">
                        <Link to="/tasks/student" className="nav-link">Tareas</Link> 
                    </li>: ''}
                </ul>
            </div>  
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                <button className="btn btn-primary my-2 my-sm-0" type="submit">Salir</button>
            </form>
        </nav> : <></> }
    </>
  )
}
