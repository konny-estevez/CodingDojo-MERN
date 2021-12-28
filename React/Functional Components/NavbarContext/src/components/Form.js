import React, {useContext} from 'react';
import AppContext from '../context/Context';

export const Form = () => {
    const context = useContext(AppContext);

    const handleChange = (e) => {
        context.setUsername(e.target.value);
    }

    return (
        <form >
            <br/>
            <div className="mb-4 row">
                <strong><label htmlFor="username" className="col-sm-2 col-form-label-lg">Your Name:</label></strong>
                <div className="col-sm-10">
                    <input type="text" className="form-control-lg" style={{backgroundColor: "gainsboro"}} id="username" onChange={handleChange} />
                </div>
            </div>
        </form>
    )
}
