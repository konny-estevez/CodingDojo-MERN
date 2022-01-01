import React from 'react'

export const Button = ({setList}) => {
    const handleClick = async () => {
        let url = 'https://pokeapi.co/api/v2/pokemon/';
        let tempList = [];

        while (url !== null ) {
            await fetch(url)
                .then(resp => resp.json())
                .then(data => {
                    url = data.next;
                    if (data.results !== null) {
                        tempList =[ ...tempList, ...data.results.map(item => item.name)];
                    }
                })
            .catch(err => console.log(err));
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
