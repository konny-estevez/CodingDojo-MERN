import { useState } from 'react';
import './App.css';
import { Router } from '@reach/router';
import { Person } from './components/Person';
import { Resources } from './components/Resources';

function App() {
  const [resource, setReource] = useState();
  
  return (
    <div className="container">
      <Router>
        <Resources path="/" result={resource} setResult={setReource} />
        <Person path="/:id" />
      </Router>
    </div>
  );
}

export default App;
