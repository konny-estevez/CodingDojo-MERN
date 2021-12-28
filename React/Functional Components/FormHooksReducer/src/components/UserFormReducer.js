import React, { useReducer } from 'react'

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
};

const reducer = (state, action) => {
    return {
        ...state, [action.type]:{value: action.payload, error: action.error}
    };
}

export const UserFormReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleChange(e) {
        const { name, value } = e.target;
        let error = '';
        switch (name) {
            case 'firstName':
                error = value.length > 2 ? '' : 'First Name must be at least 3 characters';                
                break;
            case 'lastName':
                error = value.length > 2 ? '' : 'Last Name must be at least 3 characters';
                break;
            case 'email':
                error = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? '' :
                    'Email must be at least 5 characters and have a valid format';
                break;
            default:
                break;
        }

        dispatch({
            type: name,
            payload: value,
            error: error,
        });
    }

    return (
        <div>
            <form >
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">First Name: </span>
                    <input type="text" name='firstName' className="form-control" onChange={ handleChange } value={state.firstName.value}/>
                </div>
                {
                    !state.firstName.error ? '' :
                    <p style={{color:'red'}}>{ state.firstName.error }</p>
                }
                <br/>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Last Name: </span>
                    <input type="text" name='lastName' className="form-control" onChange={ handleChange } value={state.lastName.value}/>
                </div>
                {
                    !state.lastName.error ? '' :
                    <p style={{color:'red'}}>{ state.lastName.error }</p>
                }
                <br/>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Email: </span>
                    <input type="text" name='email' className="form-control" onChange={ handleChange } value={state.email.value}/>
                </div>
                {
                    !state.email.error ? '' :
                    <p style={{color:'red'}}>{ state.email.error }</p>
                }
            </form>           
        </div>
    )
}
