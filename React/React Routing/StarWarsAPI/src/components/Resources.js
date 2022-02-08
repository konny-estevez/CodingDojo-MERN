import React, { useState } from 'react';

export const Resources = ({result, setResult}) => {
    const [resourceId, setResourceId] = useState('');
    const [idError, setIdError] = useState('');
    const [apiError, setApiError] = useState('');
    let cbxResources = document.getElementById('cbxResources');

    const categories = [
        {   value: 'films', name: 'Films',  },
        {   value: 'people', name: 'People',  },
        {   value: 'planets', name: 'Planets',  },
        {   value: 'species', name: 'Species',  },
        {   value: 'starships', name: 'Starships' },
        {   value: 'vehicles', name: 'Vehicles',  },
    ]
    const errorDetail = {
        message: "These are not the droids that I'm searching.",
        status: "Error",
        image: "https://www.cinemascomics.com/wp-content/uploads/2020/07/serie-kenobi-star-wars-960x720.jpg.webp"
    };

    const handleChange = (e) => {
        if (!isNaN(e.target.value))
            setResourceId(e.target.value);
        else
            setIdError('The value must be an integer number.');
    }

    const handleClick = () => {
        if (resourceId > 0) {
            setIdError('');
            const rootUrl = 'https://swapi.dev/api/';
            let url = `${rootUrl}${cbxResources.value}/${resourceId}`;
            fetch(url).then(async res => { 
                if (res.status === 200) {
                    setResult(await res.json());
                    setApiError();
                 }
                 else {
                    setResult();
                    setApiError(errorDetail);
                 }
            })
            .catch(error => {console.error(error);
                setResult();
                setApiError(errorDetail);
            });
        }
        else {
            setIdError('The value must be an integer number.');
            setResult();
        }
    }

    return (
        <>
        <br/>
        <div className='row'>
            <br/>
            <div className='col-lg'>
                Search for: 
            </div>
            <div className='col-lg-3'>
                <select id='cbxResources' className='form-control'>
                    { categories.map((item, i) => 
                        <option key={i} value={item.value}>{item.name}</option>)
                    }
                </select>
            </div>
            <div className='col-lg'>
            </div>
            <div className='col-lg'>
                Id:
            </div>
            <div className='col-lg-3'>
                <input type='number' className="form-control" onChange={handleChange} value={resourceId}></input>
                {idError !== '' ? <span className="text-danger">{idError}</span> : ''}
            </div>
            <div className='col-lg-3'>
                <button type='submit' className="btn btn-default" onClick={handleClick}>Search</button>
            </div>
        </div>
        <br/>
        <div>
            <h2>Result</h2>
            <h4>{result !== undefined ? `${cbxResources.value}: ${result[Object.keys(result)[0]]}` : ''}</h4>
            { apiError !== undefined ? <h4>{apiError.message}</h4> : '' }
            { apiError !== undefined ? <img src={apiError.image} height="250px" alt="Error"/> : '' }
            <ul>
            {result !== undefined && apiError === undefined ? Object.keys(result).map((keyName, i) => 
                (<li key={i}>
                    <span >{keyName}: {result[keyName]}</span>
                </li>)) : ''}
            </ul>
            </div>
        </>
    )
}
