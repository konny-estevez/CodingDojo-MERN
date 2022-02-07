import React, { useState } from 'react';
import ProductApi from './ProductsApi';

export const ProductForm = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [id, setId] = useState();
    const [errors, setErrors] = useState();

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
            title: title,
            price: price,
            description: description, 
        }
        const createdProduct = await ProductApi.create(product);
        if (createdProduct.errors) {
            setErrors("Errors: " + createdProduct.message);
        }
        else if (createdProduct._id) {
            setId(createdProduct._id);
            setErrors("Product created successfully.")
        }
    }

  return <div>
      <div className="row-fluid">
        <h1 className="center">Product Form</h1>
      </div>
      <br/>
      <div className="input-group mb-3">
            <span className="input-group-text" >Id:</span>
            <input type="text" className="form-control"  name="id" value={id} disabled/>
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
  </div>;
};
