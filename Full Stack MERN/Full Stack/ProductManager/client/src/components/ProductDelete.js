import React from 'react';
import {navigate} from '@reach/router';
import ProductsApi from './ProductsApi';

export const ProductDelete = ({id, callback}) => {
    const handleClick = async () => {
        let result;
        await ProductsApi.drop(id)
            .then(response => result = response)
            .catch(error => error);
        if (result.deletedCount > 0) {
            callback(id);
            navigate("/Products");
        }
    }

  return <>
      <button className="btn btn-danger" onClick={handleClick} >Delete</button>
  </>;
};
