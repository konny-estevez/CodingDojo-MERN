import React, { Component } from 'react'

export default class PersonCardBirthday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: this.props.age
        };
    }

    render() {
        const { firstName, lastName, hairColor } = this.props;

        const addYear = () => {
           this.setState( {age: this.state.age + 1});
        }
        
        return (
            <div>
                <h2>{lastName}, {firstName}</h2>
                <p>Age: {this.state.age }</p>
                <p>Hair Color: {hairColor}</p>
                <br/>
                <button className="btn btn-default" onClick={addYear}>Birthday Button for {firstName} {lastName}</button>
            </div>
        )
    }
}
