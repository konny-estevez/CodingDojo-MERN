import './App.css';
import {Router, Link } from '@reach/router';
import { ProductForm } from './components/ProductForm';

function App() {
  return (
    <div className="container">
      <Router>
        <ProductForm path="/Products/New" />
      </Router>
    </div>
  );
}

export default App;
