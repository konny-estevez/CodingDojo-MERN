import React from 'react';
import { Link } from '@reach/router';

export const NavBar = (props) => {
  return (
      <div className="navbar bg-light" style={{color: "white"}}>
        <Link to = "/dashboard">Dashboard</Link>
        <Link to = "/login">Login</Link>
        <Link to = "/dogs">Dogs</Link>
        <Link to = "/dogs/1">Dog 1</Link>
        <Link to = "/dogs/2">Dog 2</Link>
        <Link to = "/dogs/3">Dog 3</Link>
        <Link to = "/dogs/4">Dog 4</Link>
      </div>
  );
}