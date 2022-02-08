import React, { useEffect, useState } from 'react';
import pokemonApi from './pokemonApi';
import {Link} from '@reach/router';

export const PaginationGrid = (props) => {
    const {title, currentPage, setCurrentPage} = props;
    const [results, setResults] = useState({});
    const [itemCount, setItemCount] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const [pagesArray, setPagesArray] = useState([]);
    const pageSizes = [5,10,20,25,50,100,200,250,500,1000,2000];

    useEffect(() => {
      getData(currentPage,pageSize);
    }, []);

    const getData = async (pageNumber,pageSize) => {
      console.log("getDatamethod", pageNumber, pageSize);
      pageNumber = pageNumber ? pageNumber : 1;
      pageNumber = pageNumber > pagesArray.length ? pagesArray.length : pageNumber;
      setCurrentPage(pageNumber);
      let {results, count} = await pokemonApi.getPokemons(pageNumber,pageSize);
      setResults(results);
      //console.log(results);
      setItemCount(count);
      calculatePagesArray(count,pageSize);
    }

    const getIdFromUrl = (url) => {
      return url.endsWith('/') ? url.substr(url.lastIndexOf('/', url.length-2)+1, 10) : url.substr(url.lastIndexOf('/'), 10);
    }

    const calculatePagesArray = (itemsCount, newPageSize) => {
      //console.log(itemsCount, newPageSize);
      let array = new Array(Math.ceil(itemsCount/newPageSize));
      for (let i = 1; i <= array.length; i++) {
        array[i-1] = i;
      }
      setPagesArray(array);
      return array.length;
    }

    const handleChangePageNumber = (e) => {
      setCurrentPage(e.target.value);
      getData(e.target.value, pageSize);
    }

    const handleChangePageSize = (e) => {
      setPageSize(e.target.value);
      let newTotalPages = calculatePagesArray(itemCount,e.target.value);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
        getData(newTotalPages, e.target.value);
        return;
      }
      getData(currentPage, e.target.value);
    }

    const getPageNumber = (position) => {
      switch (position) {
        case 1:
          return 1;
        case 2:
          return currentPage < position + 4 ? 2 : "...";
        case 3:
          return currentPage < position + 3 ? 3 : currentPage - 1;
        case 4:
          if (currentPage < position)
            return position;
          else if (currentPage > pagesArray.length - position)
            return pagesArray.length - position;
          else 
            return currentPage;
        case 5:
          return currentPage < position + 1 ? 5 : currentPage + 1;
        case 6:
          return currentPage >= pagesArray.length - 1 ? currentPage : "...";
        case 7:
          return pagesArray.length;
        default:
          return -1;
      }
    }
  return <div>
      <h1>{title}</h1>
      <div>Total items: {itemCount} - Current Page: {currentPage}</div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { results && results.map((pk,i) => <tr key={i}>
              <td>{i+1}</td>
              <td><Link to={"/"+getIdFromUrl(pk.url)}>{pk.name}</Link></td>
              <td>{pk.url}</td></tr> )
          }
        </tbody>
      </table>
      <div className="row">
        <div className="col-md-2">Page Number:</div>
        <div className="col-md-3">
         <select className="form-control" onChange={handleChangePageNumber} value={currentPage}>
            { pagesArray ? pagesArray.map(pg => <option key={pg} value={pg}>{pg}</option>) : '' }
          </select>
        </div>
        <div className="col-md-2">Page Size:</div>
        <div className="col-md-3">
          <select className="form-control" onChange={handleChangePageSize} value={pageSize} >
            { pageSizes.map(ps => <option key={ps} value={ps}>{ps}</option>) }
          </select>
        </div>
      </div>
      <br/>
      <nav aria-label="...">
          <ul className="pagination">
            <li className="page-item ">
              <button className="page-link" onClick={(e) => getData(1,pageSize)}>First</button>
            </li>
            <li className="page-item ">
              <button className="page-link" onClick={(e) => getData(currentPage-1,pageSize)}>Previous</button>
            </li>
            <li className={currentPage === getPageNumber(1) ? "page-item active" : "page-item"} aria-current={currentPage === getPageNumber(1) ? "page" : ""}>
              <button className="page-link" onClick={(e) => getData(1,pageSize)} >{getPageNumber(1)}</button>
            </li>
            { pagesArray.length > 1 ?
              <li className={currentPage === getPageNumber(2) ? "page-item active" : "page-item"} aria-current={currentPage === getPageNumber(2) ? "page" : ""}>
                <button className="page-link" onClick={(e) => getData(getPageNumber(2),pageSize)} >{getPageNumber(2)}</button>
              </li> : '' }
            { pagesArray.length > 2 ?
              <li className={currentPage === getPageNumber(3) ? "page-item active" : "page-item"} aria-current={currentPage === getPageNumber(3) ? "page" : ""}>
                <button className="page-link" onClick={(e) => getData(getPageNumber(3),pageSize)} >{getPageNumber(3)}</button>
              </li>  : '' }
              { pagesArray.length > 3 ?
              <li className={currentPage === getPageNumber(4) ? "page-item active" : "page-item"} aria-current={currentPage === getPageNumber(4) ? "page" : ""}>
                <button className="page-link" onClick={(e) => getData(getPageNumber(4),pageSize)} >{getPageNumber(4)}</button>
              </li> : '' }
              { pagesArray.length > 4 ?
              <li className={currentPage === getPageNumber(5) ? "page-item active" : "page-item"} aria-current={currentPage === getPageNumber(5) ? "page" : ""}>
                <button className="page-link" onClick={(e) => getData(getPageNumber(5),pageSize)} >{getPageNumber(5)}</button>
              </li> : '' }
              { pagesArray.length > 5 ?
              <li className={currentPage === getPageNumber(6) ? "page-item active" : "page-item"} aria-current={currentPage === getPageNumber(6) ? "page" : ""}>
                <button className="page-link" onClick={(e) => getData(getPageNumber(6),pageSize)} >{getPageNumber(6)}</button>
              </li> : '' }
              { pagesArray.length > 6 ?
              <li className={currentPage === getPageNumber(7) ? "page-item active" : "page-item"} aria-current={currentPage === getPageNumber(7) ? "page" : ""}>
                <button className="page-link" onClick={(e) => getData(getPageNumber(7),pageSize)} >{getPageNumber(7)}</button>
              </li> : '' }
            <li className="page-item">
              <button className="page-link" onClick={(e) => getData(currentPage+1,pageSize)}>Next</button>
            </li>
            <li className="page-item ">
              <button className="page-link" onClick={(e) => getData(pagesArray.length,pageSize)}>Last</button>
            </li>
          </ul>
        </nav>
  </div>;
};
