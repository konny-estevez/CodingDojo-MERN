import {Link} from '@reach/router';

import {ProductDelete} from './ProductDelete';

export const ProductList = ({products, setProducts, updateList}) => {

  return <div>
      <h1>Products List</h1>
      <br/>
      <Link to="/Products/New" className="btn btn-secondary">New Product</Link>
      <br/>
      <br/>
      {products && products.map((item,i) => <p key={i}><Link to={"/Products/"+item._id}>{item.title}
        </Link> | <ProductDelete id={item._id} callback={updateList} />
      </p>)}
  </div>;
};
