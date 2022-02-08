import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import ProductsApi from './ProductsApi';

export const ProductEdit = ({id_edit, updateProduct}) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [id, setId] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(async () => {
        let result;
        await ProductsApi.get(id_edit)
             .then(response => { return result = response})
             .catch(error => error);
        setId(result._id) ;
        setTitle(result.title);
        setPrice(result.price);
        setDescription(result.description);
       }, [id]);

    const handleChange = (e) => {
        switch (e.target.name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "price":
                setPrice(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            default:
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = {
            _id: id,
            title: title,
            price: price,
            description: description, 
        }
        const updatedProduct = await ProductsApi.update(product, id_edit);
        if (updatedProduct.errors) {
            setErrors("Errors: " + updatedProduct.message);
        }
        else if (updatedProduct._id) {
            setId(updatedProduct._id);
            setErrors("Product updated successfully.");
            updateProduct(updatedProduct);
        }
    }

  return <div>      
      <h1>Product Edit</h1>
        <br/>
        <div className="input-group mb-3">
            <span className="input-group-text" >Id:</span>
            <input type="text" className="form-control" name="id" onChange={handleChange} value={id} disabled/>
        </div>
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
            <span className="input-group-text" >Title:</span>
            <input type="text" className="form-control" placeholder="title of the product" name="title" onChange={handleChange} value={title}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" >Price:</span>
            <input type="number" className="form-control" placeholder="price of the product" name="price" onChange={handleChange} value={price}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" >Description:</span>
            <input type="text" className="form-control" placeholder="description of the product" name="description" onChange={handleChange} value={description}/>
        </div>
        <div className="row" style={{"color":"red"}}>
            {errors}
        </div>
        <br/>
        <div className="input-group mb-3">
            <button className="btn btn-secondary">Submit</button>
        </div>
      </form>
      <div  className="input-group mb-3">
            <Link to="/Products/" className="btn btn-secondary">Product List</Link>
        </div>
    </div>;
};
