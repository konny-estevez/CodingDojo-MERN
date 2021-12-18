import React, {useState} from 'react'

export const PersonCard = (props) => {
    const {firstName, lastName, hairColor} = props;

    const [age, setAge] = useState(props.age);

    const addYear = () => {
        setAge(age + 1);
    }

    return (
        <div>
            <h2>{lastName}, {firstName}</h2>
            <p>Age: {age}</p>
            <p>Hair color: {hairColor}</p>
            <button className="btn btn-default" onClick={addYear}>Birthday Button for {firstName} {lastName}</button>
        </div>
    )
}
