import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import ProductsApi from './ProductsApi';

export const ProductList = () => {
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

  return <div>
      <h1>Products List</h1>
      <br/>
      <Link to="/Products/New" className="btn btn-secondary">New Product</Link>
      <br/>
      <br/>
      <ul>{products && products.map((item,i) => <li key={i}><Link to={"/Products/"+item._id}>{item.title}</Link></li>)}</ul>
  </div>;
};
