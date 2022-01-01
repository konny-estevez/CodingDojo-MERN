import React from 'react';
import axios from 'axios';

export const Button = ({setList}) => {
    const handleClick = async () => {
        let url = 'https://pokeapi.co/api/v2/pokemon/';
        let tempList = [];

        while (url !== null ) {
            await axios.get(url)
                .then(resp => resp.data)
                .then(data => {
                    url = data.next;
                    if (data.results !== null) {
                        tempList =[ ...tempList, ...data.results.map(item => item.name)];
                    }
                })
            .catch(err => alert(err));
        };
        setList(tempList);
    }

    return (
        <div className="">
            <br/>
            <button className="btn btn-lg btn-secondary" onClick={handleClick} >Fetch Pokemon</button>
            <br /><br />
        </div>
    )
}
