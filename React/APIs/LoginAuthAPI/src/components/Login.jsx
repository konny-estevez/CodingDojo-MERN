import React, { useState } from 'react'

export const Login = ({setSession}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://restapi.adequateshop.com/api/authaccount/login",
            {
                method:'POST',
                body: JSON.stringify({email: email, password: password}),
                headers: { 'Content-Type': 'application/json', 'CORS': 'Access-Control-Allow-Origin' },
            })
            .then(response => { 
                if (response.status === 200) {
                    setError('');
                    return response.json();
                }
                else if (response.status === 401) {
                    setSession({});
                }
                throw response.status + " - " + response.statusText;
            })
            .then(data => {
                if (data.code === 0) {
                    setSession(data.data);
                }
                else {
                    setError(data.message);
                }
            })
            .catch(error => setError(error));
    }

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

  return (
    <div className="App-header">
        <h3>Inicio de Sesión</h3>
        <br/>
        <form method='POST' onSubmit={handleSubmit} style={{width: "500px"}}>
            <label htmlFor='email'>Email:</label>
            <input type='email' className="form-control" name='email' onChange={handleChange} value={email} required></input>
            <label htmlFor='password'>Password:</label>
            <input type='password' className="form-control" name='password' onChange={handleChange} value={password} required></input>
            <div className="text-danger mb-3 small">{error}</div>
            <input className="btn btn-primary" type="submit" value="Login"></input>
        </form>
    </div>
  )
}
