import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import PersonForm from '../components/PersonForm';
import DeleteButton from '../components/DeleteButton';

export default props => {
    const { id } = props;
    const [person, setPerson] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/people/' + id)
            .then(res => {
                setPerson(res.data);
                setLoaded(true);            
            })
    }, []);
    
    const updatePerson = person => {
        axios.put('http://localhost:8000/api/people/' + id, person)
            .then(res => console.log(res));
    }
    
    return (
        <div>
            <h1>Update a Person</h1>
            {loaded && (<>
                <PersonForm
                    onSubmitProp={updatePerson}
                    initialFirstName={person.firstName}
                    initialLastName={person.lastName}
                />
                <DeleteButton personId={person._id} successCallback={() => navigate("/people")} />
            </>)}
            <br/>
            <Link to={"/people/" + id}>
                Detalles                        
            </Link>
        </div>
    )
}
