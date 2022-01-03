import React, {useEffect, useState} from 'react';

export const Person = ({id}) => {
    const [person, setPerson] = useState();
    const [homeworld, setHomeworld] = useState();

    useEffect(() => {
        fetch(`https://swapi.dev/api/people/${id}`)
            .then(res => res.json())
            .then(data => setPerson(data) )
            .catch(error => console.error(error));
    }, [id])

    const handleHomeworld = (url) => {
        console.log(url);
        fetch(url).then(res => res.json())
            .then(data => setHomeworld(data))
            .catch(error => console.error(error));
    }

    return (
        <div>
            <h1>Person Details</h1>
            <h2>{person !== undefined ? person.name : ''}</h2>
            <ul>
            {person !== undefined ? Object.keys(person).map((keyName, i) => {
                if (keyName === "homeworld")
                    handleHomeworld(person[keyName]);
                return (<li key={i}>
                    <span >{keyName}: {person[keyName]}</span>
                </li>)}) : ''}
            </ul>
            <br/>
            <h3>{homeworld !== undefined ? `Homeworld: ${homeworld.name}` : ''}</h3>
            <ul>
            {homeworld !== undefined ? Object.keys(homeworld).map((keyName, i) => 
                (<li key={i}>
                    <span >{keyName}: {homeworld[keyName]}</span>
                </li>)) : ''}
            </ul>
        </div>
    )
}
