import React, { useEffect, useState } from 'react';
import {Link, navigate} from '@reach/router';
import ProductsApi from './ProductsApi';
import { ProductDelete } from './ProductDelete';

export const ProductDetail = ({id, isEdit, updateList}) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
       ProductsApi.get(id)
            .then(response => setProduct(response))
            .catch(error => error);
      }, [id]);

  return <div>
      <h1>Product Detail</h1>
      <br/>
      { product.title ? <>
      <div className="input-group mb-3">
            <span className="input-group-text" >Id:</span>
            <input type="text" className="form-control"  name="id" value={product._id} disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" >Title:</span>
            <input type="text" className="form-control" name="title" value={product.title} disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" >Price:</span>
            <input type="number" className="form-control" name="price" value={product.price} disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" >Description:</span>
            <input type="text" className="form-control" name="description" value={product.description} disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" >Created At:</span>
            <input type="text" className="form-control" name="description" value={product.createdAt} disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" >Updated At:</span>
            <input type="text" className="form-control" name="description" value={product.updatedAt} disabled/>
        </div>
        </> :''}
        <div className="input-group mb-3">
            <Link className="btn btn-secondary" to={"/Products/" + product._id + "/edit"}>Edit
            </Link> | <Link className="btn btn-secondary" to="/Products">Back to List
            </Link> | <ProductDelete id={product._id} callback={updateList} />
        </div>
        <div className="input-group mb-3">
            
        </div>
  </div>;
};
