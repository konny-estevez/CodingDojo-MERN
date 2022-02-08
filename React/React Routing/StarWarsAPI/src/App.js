import { useState } from 'react';
import './App.css';
import { Router } from '@reach/router';
import { Person } from './components/Person';
import { Resources } from './components/Resources';

function App() {
  const [resource, setResource] = useState('');
  
  return (
    <div className="container">
      <Router>
        <Resources path="/" result={resource} setResult={setResource} />
        <Person path="/:id" />
      </Router>
    </div>
  );
}

export default App;
