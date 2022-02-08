import './App.css';
import {Router } from '@reach/router';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { ProductEdit } from './components/ProductEdit';

function App() {
  return (
    <div className="container">
      <Router>
        <ProductList path="/Products" />
        <ProductForm path="/Products/New" />
        <ProductDetail path="/Products/:id" />
        <ProductEdit path="/Products/:id_edit/edit" />
      </Router>
    </div>
  );
}

export default App;
