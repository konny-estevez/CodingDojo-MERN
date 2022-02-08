import React, { useEffect, useState } from 'react';
import './App.css';
import {Router } from '@reach/router';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { ProductEdit } from './components/ProductEdit';
import ProductsApi from './components/ProductsApi';

function App() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(async () => {
    let data;
    await ProductsApi.getAll()
        .then(response => data = response)
        .catch(error => error);
    setProducts(data.results);
    setCount(data.count);
  }, []);

  const addList = (newProduct) => {
    setProducts([...products, newProduct])
  }

  const updateProduct = (product) => {
    let temp = products.map(item => {
      if (item._id === product._id) {
        return product;
      }
      return item;
    });
    setProducts(temp);
  }

  const updateList = (id) => {
      let temp = products.filter(item => item._id !== id);
      setProducts(temp);
  } 

  return (
    <div className="container">
      <Router>
        <ProductList path="/Products" products={products} setProducts={setProducts} updateList={updateList}/>
        <ProductForm path="/Products/New" addList={addList}/>
        <ProductDetail path="/Products/:id" updateList={updateList}/>
        <ProductEdit path="/Products/:id_edit/edit" updateProduct={updateProduct}/>
      </Router>
    </div>
  );
}

export default App;
