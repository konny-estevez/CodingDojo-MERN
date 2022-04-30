import React, { useEffect, useState } from 'react'

export const Users = ({session}) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [pagesArray, setPagesArray] = useState([]);

    useEffect(() => {
        if (session.Token) {
            fetch(`http://restapi.adequateshop.com/api/users?page=${currentPage}`,
            {
                headers: {'Authorization': "Bearer " + session.Token}
            })
                .then(response => {
                    if (response.status === 200) {
                        setError(''); 
                        return response.json();
                    }
                    else {
                        throw response.status + " - " + response.statusText;
                    }
                })
                .then(data => {
                    setTotal(data.totalrecord);
                    setPages(data.total_pages);
                    setUsers(data.data); 
                    if (data.total_pages !== pages) {
                        let array = [];
                        for (let i = 1; i<=data.total_pages; i++){
                            array.push(i);
                        } 
                        console.log(array);
                        setPagesArray(array);
                    }
                })
                .catch(error => setError(error));
        }
    }, [session.Token,currentPage]);

    const handleClick = (e) => {
        if (e.target.name === "previous") {
            if (currentPage > 1)
                setCurrentPage(currentPage - 1);
        }
        else if (e.target.name === "next") {
            if (currentPage < pages)
                setCurrentPage(currentPage + 1);
        }
    }

    const handleChange = (e) => {
        setCurrentPage(parseInt(e.target.value));
    }
    
  return (
    <div>
        <h3>Lista de Usuarios</h3>
        <div className="text-danger mb-3 small">{error}</div>
        <table className="table table-hover table-bordered table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Picture</th>
                    <th>Location</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
            {   
            users.map((user,index) => 
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <a href={user.profilepicture} target="_blank" rel="noreferrer" alt=""><img src={user.profilepicture} width="48px"/></a>
                        </td>
                        <td>{user.location}</td>
                        <td>{user.createdat}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
        <div><b>Total Registros: </b>{total}</div>
        <br/>
        <div>
            <button type="button" name="previous" className="btn btn-primary" onClick={handleClick} >Anterior</button>
            &nbsp;&nbsp;&nbsp;
            <b>Página: </b>
            <select onChange={handleChange} value={currentPage}>
                { 
                    pagesArray.map((page,index) =>
                        <option key={index} value={page}>{page}</option>
                    )
                }
            </select>
            &nbsp;&nbsp;&nbsp;
            <button type="button" name="next" className="btn btn-primary" onClick={handleClick} >Siguiente</button>
        </div>
    </div>
  )
}
