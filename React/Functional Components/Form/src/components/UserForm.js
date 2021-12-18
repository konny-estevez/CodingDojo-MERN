import React, { useState } from  'react';
    
const UserForm = (props) => {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");  
    const [passwordError, setPasswordError] = useState("");
    const [isSubmited, setIsSubmited] = useState(false);
    
    const createUser = (e) => {
        e.preventDefault();
        if (!usernameError && !emailError && !passwordError) {
            const newUser = { username, email, password };
            setUsername('');
            setPassword('');
            setEmail('');
            console.log("Welcome", newUser);
            setIsSubmited(true);
        }
    };
    
    const handleUsername = (e) => {
        setUsername(e.target.value);
        if(e.target.value.length < 1) {
            setUsernameError("Username is required!");
        } else if(e.target.value.length < 3) {
            setUsernameError("Username must be 3 characters or longer!");
        } else {
            setUsernameError('');
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if(e.target.value.length < 1) {
            setEmailError("Email is required!");
        } else if(e.target.value.length < 5) {
            setEmailError("Email must be 5 characters or longer!");
        } else {
            setEmailError('');
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if(e.target.value.length < 1) {
            setPasswordError("Password is required!");
        } else if(e.target.value.length < 8) {
            setPasswordError("Password must be 8 characters or longer!");
        } else {
            setPasswordError('');
        }
    }

    return(
        <form onSubmit={ createUser }>
            { 
                isSubmited ? 
                <h3>Thank you for submitting the form!</h3> :
                <h3>Welcome, please submit the form.</h3> 
            }
            <div>
                <label>Username: </label> 
                <input type="text" required onChange={ handleUsername } value={username} />
                {
                    !usernameError ? '' :
                    <p style={{color:'red'}}>{ usernameError }</p> 
                }
            </div>
            <div>
                <label>Email Address: </label> 
                <input type="email" required onChange={ handleEmail } value={email}/>
                {
                    !emailError ? '' :
                    <p style={{color:'red'}}>{ emailError }</p> 
                }
            </div>
            <div>
                <label>Password: </label>
                <input type="password" required onChange={ handlePassword } value={password}/>
                {
                    !passwordError ? '' :
                    <p style={{color:'red'}}>{ passwordError }</p> 
                }
            </div>
            <input type="submit" value="Create User" />
        </form>
    );
};
    
export default UserForm;