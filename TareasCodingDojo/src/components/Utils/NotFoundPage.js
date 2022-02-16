import React from 'react';
import {Link} from '@reach/router';

export const NotFoundPage = () => {
  return (
    <div className="text-center">
        <img className="not-found" src="/img/error-404-not-found.jpg" alt="Not found"/>
        <br/><br/>
        <Link to="/home" className="btn btn-primary" >Volver al Inicio</Link>
    </div>
  )
}
