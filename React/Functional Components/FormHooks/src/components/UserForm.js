import React, {useState} from 'react'

export const UserForm = () => {
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('');    
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [confirmationError, setConfirmationError] = useState('');

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        if (e.target.value.length > 0 && e.target.value.length < 3)
            setFirstNameError('First Name must be at least 3 characters.');
        else
            setFirstNameError('');
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
        if (e.target.value.length > 0 && e.target.value.length < 3)
            setLastNameError('Last Name must be at least 3 characters.');
        else
            setLastNameError('');
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if ((e.target.value.length > 0 && e.target.value.length < 5) || e.target.value.indexOf('@') < 0)
            setEmailError('Email must be at least 5 characters and valid address.');
        else
            setEmailError('');
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length > 0 && e.target.value.length < 8)
            setPasswordError('Password must be at least 8 characters.');
        else
            setPasswordError('');
    }

    const handleConfirmation = (e) => {
        setConfirmation(e.target.value);
        if ((e.target.value.length > 0 && e.target.value.length < 8) || e.target.value !== password)
            setConfirmationError('Confirmation must be at least 8 characters and match with password.');
        else
            setConfirmationError('');
    }

    return (
        <div>
            <br/>
            <form >
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">First Name: </span>
                    <input type="text" className="form-control" onChange={ handleFirstName } value={firstName}/>
                </div>
                {
                    !firstNameError ? '' :
                    <p style={{color:'red'}}>{ firstNameError }</p>
                }
                <br/>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Last Name: </span>
                    <input type="text" className="form-control" onChange={handleLastName} value={lastName}/>
                </div>
                {
                    !lastNameError ? '' :
                    <p style={{color:'red'}}>{ lastNameError }</p>
                }
                <br/>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Email: </span>
                    <input type="text" className="form-control" onChange={handleEmail} value={email}/>
                </div>
                {
                    !emailError ? '' :
                    <p style={{color:'red'}}>{ emailError }</p>
                }
                <br/>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Password: </span>
                    <input type="password" className="form-control" onChange={handlePassword} value={password}/>
                </div>
                {
                    !passwordError ? '' :
                    <p style={{color:'red'}}>{ passwordError }</p>
                }
                <br/>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Confirm: </span>
                    <input type="password" className="form-control" onChange={handleConfirmation} value={confirmation}/>
                </div>
                {
                    !confirmationError ? '' :
                    <p style={{color:'red'}}>{ confirmationError }</p>
                }
            </form>
            <br/>
            <h2>Your Form Data</h2>
            <table>
                <tbody>
                    <tr>
                        <td>First Name: </td>
                        <td> {firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name: </td>
                        <td> {lastName}</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td> {email}</td>
                    </tr>
                    <tr>
                        <td>Password: </td>
                        <td> {''.padEnd(password.length, '*')}</td>
                    </tr>
                    <tr>
                        <td>Confirmation: </td>
                        <td> {''.padEnd(confirmation.length,'*')}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
